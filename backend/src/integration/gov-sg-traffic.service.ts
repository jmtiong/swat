import { GovSgTrafficSuccessResponse } from "@/dto/gov-sg.dto";
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
export class GovSgTrafficService implements OnApplicationBootstrap {
  protected logger = new Logger(GovSgTrafficService.name)

  constructor (
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
    protected readonly datetimeService: DatetimeService
  ) {}

  async onApplicationBootstrap() {
    const setting = await this.prismaService.schedulerSetting.findFirst({
      where: {
        name: TaskType.GOV_SG_TRAFFIC_TASK
      }
    })

    if (!setting) {
      const schedule = await this.prismaService.schedulerSetting.create({
        data: {
          enable: true,
          frequency: ScheduleFrequency.MINUTELY,
          minute: 1,
          name: TaskType.GOV_SG_TRAFFIC_TASK,
          timestamp: BigInt(Date.now())
        } as SchedulerSetting
      })

      this.logger.log(`Added a default setting for ${TaskType.GOV_SG_TRAFFIC_TASK}`)
    }

    const apiConfig = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: ApiName.GOV_SG_TRAFFIC_URL
      }
    })

    if (!apiConfig) {
      const config = await this.prismaService.systemConfiguration.create({
        data: {
          module: 'GOV_SG',
          name: ApiName.GOV_SG_TRAFFIC_URL,
          value: 'https://api.data.gov.sg/v1/transport/traffic-images',
          version: '1'
        } as SystemConfiguration
      })
      this.logger.log(`Added default system configuration for ${ApiName.GOV_SG_TRAFFIC_URL}`)
    }
  }

  async retrieveTransportTrafficImages (timestamp: number = undefined) {
    const systemConfig = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: ApiName.GOV_SG_TRAFFIC_URL
      }
    })

    if (!systemConfig) {
      throw new BadRequestException('There is no traffic url to retrieve from.')
    }

    let parameter = undefined
    if (isNumber(timestamp)) {
      parameter = `?date_time=${encodeURIComponent(this.datetimeService.convertTimestampToTimeZoneFormat(timestamp))}`
    }

    const { data }= await firstValueFrom(
      this.httpService.get(`${systemConfig.value}${parameter ? parameter : ''}`).pipe(catchError((error: AxiosError) => {
        this.logger.error(`The requested URL is ${systemConfig.value}`)
        this.logger.error(error)
        throw new BadRequestException('Unable to retrieve traffic API details!')
      }))
    )

    return GovSgTrafficSuccessResponse.convertAxiosResponseToDto(data)
  }
}