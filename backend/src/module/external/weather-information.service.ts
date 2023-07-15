import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { WeatherInformationService } from "./weather-information.interface";
import { WeatherRequestDto, WeatherListRequestDto } from "@/dto/weather-information.dto";
import { GetResult } from "@prisma/client/runtime";
import { WEATHER_FORECAST_SERVICE, WeatherForecastService } from "../weather-forecast/weather-forecast.interface";
import { AREA_SERVICE, AreaService, AreaWithWeathers } from "../area/area.interface";
import { Prisma, WeatherForecast } from "@prisma/client";
import { DatetimeService } from "@/util/date-time.service";
import { WeatherCastType } from "@/enum/enum";
import { GOV_SG_WEATHER_TASK, GovSgWeatherTask } from "@/scheduler/gov-sg-weather-task.service";

@Injectable()
export class WeatherInformationServiceImpl implements WeatherInformationService {
  constructor (
    @Inject(WEATHER_FORECAST_SERVICE) protected readonly weatherForecastService: WeatherForecastService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService,
    @Inject(GOV_SG_WEATHER_TASK) protected readonly govSgWeatherTask: GovSgWeatherTask,
    protected readonly dateService: DatetimeService
  ) {}
  async retrieveAreaWeatherForecastInformation(requestDto: WeatherRequestDto): Promise<WeatherForecast[]> {
    const area = await this.areaService.retrieveArea(requestDto.area)
    if (!area) {
      throw new BadRequestException(`There is no such area ${requestDto.area} to display.`)
    }

    const filterArgs: Prisma.WeatherForecastFindManyArgs = {
      where: {
        areaPky: area.pky,
        castType: WeatherCastType.TWO_HOUR
      },
      orderBy: {
        validTo: 'desc'
      }
    }
    if (requestDto.datetime) {
      filterArgs.where.validFrom = {
        gte: requestDto.datetime
      },
      filterArgs.where.validTo = {
        lte: requestDto.datetime
      }
    } else if (requestDto.date) {
      const timestamp = this.dateService.resetTimestampToZeros(requestDto.date)
      const nextDay = this.dateService.add(timestamp, 'day', 1)
      filterArgs.where.validFrom = {
        gte: timestamp
      },
      filterArgs.where.validTo = {
        lt: nextDay
      }
    }

    let weather = await this.weatherForecastService.retrieveWeatherForecast(area.pky)

    if (!weather) {
      await this.govSgWeatherTask.executeTask(requestDto.datetime)
    }

    return this.weatherForecastService.retrieveListOfWeatherForecast(filterArgs)
  }

  async retrieveListOfWeatherForecastInformation(requestDto: WeatherListRequestDto): Promise<AreaWithWeathers[]> {

    // Quick and naive way of constructing filters
    const filterArgs: Prisma.AreaFindManyArgs = {
      where: {},
      include: {
        weatherForecast: {
          where: {
            castType: WeatherCastType.TWO_HOUR
          },
          orderBy: {
            validTo: 'desc'
          },
          take: 1
        }
      }
    }

    if (requestDto.areas) {
      requestDto.areas = requestDto.areas.filter(area => !!area)
    }

    if (requestDto.areas && requestDto.areas.length > 0) {
      filterArgs.where.name = {
        in: requestDto.areas
      }
    }

    if (requestDto.datetime) {
      filterArgs.include.weatherForecast = {
        where: {
          castType: WeatherCastType.TWO_HOUR,
          validFrom: { lte: requestDto.datetime },
          validTo: { gte: requestDto.datetime }
        },
        orderBy: {
          validTo: 'desc'
        },
        take: 1
      }
    } else if (requestDto.date) {
      const timestamp = this.dateService.resetTimestampToZeros(requestDto.date)
      const nextDay = this.dateService.add(timestamp, 'day', 1)
      filterArgs.include.weatherForecast = {
        where: {
          castType: WeatherCastType.TWO_HOUR,
          validFrom: { lte: timestamp },
          validTo: { gt: nextDay }
        },
        orderBy: {
          validTo: 'desc'
        },
        take: 1
      }
    }
    let areas = await this.areaService.retrieveListOfAreaWithWeathers(filterArgs)

    const triggerAPI = areas.some(area => area.weatherForecast.length === 0)
    if (triggerAPI) {
      await this.govSgWeatherTask.executeTask(requestDto.datetime)
    }

    areas = await this.areaService.retrieveListOfAreaWithWeathers(filterArgs)

    return areas
  }
}