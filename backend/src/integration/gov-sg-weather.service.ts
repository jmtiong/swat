import { GovSgWeatherForecastSuccessResponse } from "@/dto/gov-sg.dto";
import { ApiName, ScheduleFrequency, TaskType } from "@/enum/enum";
import { DatetimeService } from "@/util/date-time.service";
import { PrismaService } from "@/util/prisma.service";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { SchedulerSetting, SystemConfiguration } from "@prisma/client";
import { AxiosError } from "axios";
import { isNumber } from "lodash";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class GovSgWeatherService {
  protected logger = new Logger(GovSgWeatherService.name)

  constructor (
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
    protected readonly datetimeService: DatetimeService
  ) {}

  async setupScheduleSetting () {
    const setting = await this.prismaService.schedulerSetting.findFirst({
      where: {
        name: TaskType.GOV_SG_WEATHER_TASK
      }
    })

    if (!setting || setting.name !== TaskType.GOV_SG_WEATHER_TASK) {
      const schedule = await this.prismaService.schedulerSetting.create({
        data: {
          enable: true,
          frequency: ScheduleFrequency.MINUTELY,
          minute: 5,
          name: TaskType.GOV_SG_WEATHER_TASK,
          timestamp: BigInt(Date.now())
        } as SchedulerSetting
      })

      this.logger.log(`Added a default setting for ${TaskType.GOV_SG_WEATHER_TASK}`)
      return schedule
    }
  }

  async retrieveTwoHourForecasts (timestamp: number = undefined, dateTimestamp: bigint = undefined) {
    const systemConfig = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: ApiName.GOV_SG_TWO_HOUR_WEATHER_URL
      }
    })

    if (!systemConfig) {
      throw new BadRequestException('There is no two hour weather url to retrieve from.')
    }

    let parameter = undefined
    if (isNumber(timestamp)) {
      parameter = `?date_time=${encodeURIComponent(this.datetimeService.convertTimestampToTimeZoneFormat(timestamp))}`
    } else if (isNumber(dateTimestamp)) {
      parameter = `?date=${encodeURIComponent(this.datetimeService.convertTimestampToDate(dateTimestamp))}`
    }

    const { data }= await firstValueFrom(
      this.httpService.get(`${systemConfig.value}${parameter ? parameter : ''}`).pipe(catchError((error: AxiosError) => {
        this.logger.error(`The requested URL is ${systemConfig.value}`)
        this.logger.error(error)
        throw new BadRequestException('Unable to retrieve traffic API details!')
      }))
    )

    return GovSgWeatherForecastSuccessResponse.convertAxiosResponseToDto(data)
  }
}