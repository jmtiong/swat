import { Inject, Injectable, Logger } from "@nestjs/common";
import { ScheduleTask } from "./schedule-task.interface";
import { CronTime, CronJob } from "cron";
import { SchedulerSetting, WeatherForecast } from "@prisma/client";
import { DatetimeService } from "@/util/date-time.service";
import { AREA_SERVICE, AreaService } from "@/module/area/area.interface";
import { WeatherForecastModel } from "@/model/models";
import { GovSgWeatherService } from "@/integration/gov-sg-weather.service";
import { WEATHER_FORECAST_SERVICE, WeatherForecastService } from "@/module/weather-forecast/weather-forecast.interface";

export const GOV_SG_WEATHER_TASK = 'GovSgWeatherTask'

@Injectable()
export class GovSgWeatherTask implements ScheduleTask {
  protected logger = new Logger(GovSgWeatherTask.name)
  protected jobSetting: SchedulerSetting = null
  protected cronJob: CronJob = null

  constructor (
    protected readonly govSgWeatherService: GovSgWeatherService,
    protected readonly datetimeService: DatetimeService,
    @Inject(WEATHER_FORECAST_SERVICE) protected readonly weatherForecastService: WeatherForecastService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService
  ) {}

  setupSettings(jobSetting: SchedulerSetting) {
    this.jobSetting = jobSetting
  }

  initiateJob(frequency: CronTime): CronJob {
    this.cronJob = new CronJob(frequency.sendAt(), async () => {
      this.logger.log('Executing Gov SG Weather API...')
      const weatherResponse = await this.govSgWeatherService.retrieveTwoHourForecasts()
      const areas = await this.areaService.retrieveListOfArea({})
      const weatherTimingList = weatherResponse.items
      weatherTimingList.map(async (weatherList) => {
        const { start, end } = weatherList.validPeriod
        const validFrom = DatetimeService.convertDateToTimestamp(start)
        const validTo = DatetimeService.convertDateToTimestamp(end)
        const weatherForecasts = await this.weatherForecastService.retrieveListOfWeatherForecast({
          where: {
            validFrom,
            validTo
          }
        })
        
        // Create new forecasts
        if (weatherForecasts.length === 0) {
          this.logger.log(`Generating new forecast from: ${start}, to: ${end}`)
          return Promise.all(weatherList.forecasts.map(async (forecast)=> {
            const newForecast = new WeatherForecastModel()
            const area = areas.find(area => area.name === forecast.area)
            newForecast.populateFromGovSgData(weatherList, forecast, area)
            return this.weatherForecastService.createWeatherForecastRecord(newForecast.sanitizeToDatabaseFormat() as WeatherForecast)
          }))
        }
        
        // If current timestamp is still in valid period
        const currentTime = this.datetimeService.getCurrentTimestamp()
        if (currentTime >= validFrom && currentTime <= validTo) {
          this.logger.log(`Updating forecast from ${start}, to: ${end}`)
          return Promise.all(weatherList.forecasts.map(async (forecast)=> {
            const updateForecast = new WeatherForecastModel()
            const area = areas.find(area => area.name === forecast.area)
            const currentForecast = weatherForecasts.find(existingCast => existingCast.areaPky == area.pky)
            updateForecast.populateFromGovSgData(weatherList, forecast, area)
            return this.weatherForecastService.updateWeatherForecastRecord(currentForecast.pky, updateForecast.sanitizeToDatabaseFormat() as WeatherForecast)
          }))
        }

        // If current timestamp has passed valid period
        if (currentTime > validTo) {
          this.logger.log(`Archiving forecasts from ${start}, to: ${end}`)
          return Promise.all(weatherList.forecasts.map(async (forecast)=> {
            const updateForecast = new WeatherForecastModel()
            const area = areas.find(area => area.name === forecast.area)
            const currentForecast = weatherForecasts.find(existingCast => existingCast.areaPky == area.pky)
            updateForecast.populateFromGovSgData(weatherList, forecast, area)
            updateForecast.isArchived = true
            return this.weatherForecastService.updateWeatherForecastRecord(currentForecast.pky, updateForecast.sanitizeToDatabaseFormat() as WeatherForecast)
          }))
        }

        this.logger.log(`No action taken for forecasts from: ${start}, to: ${end}`)
      })
    })

    return this.cronJob
  }
  executeTask() {
    throw new Error("Method not implemented.");
  }

}