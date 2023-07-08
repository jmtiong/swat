import { GovSgTrafficSuccessResponse } from "@/dto/gov-sg.dto";
import { ScheduleFrequency, TaskType } from "@/enum/enum";
import { DatetimeService } from "@/util/date-time.service";
import { PrismaService } from "@/util/prisma.service";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { SchedulerSetting } from "@prisma/client";
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

    if (setting) {
      this.logger.log('Gov SG Traffic Schedule Settings already exist.')
      return
    }

    const schedule = await this.prismaService.schedulerSetting.create({
      data: {
        enable: true,
        frequency: ScheduleFrequency.MINUTELY,
        minute: 1,
        name: TaskType.GOV_SG_TRAFFIC_TASK,
        timestamp: BigInt(Date.now())
      } as SchedulerSetting
    })

    if (schedule) {
      this.logger.log(`Added a default setting for ${TaskType.GOV_SG_TRAFFIC_TASK}`)
    }
  }

  async retrieveTransportTrafficImages (timestamp: number) {
    const url = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: 'gov-sg-traffic-url'
      }
    })

    if (!url) {
      throw new BadRequestException('There is no traffic url to retrieve from.')
    }

    let parameter = undefined
    if (isNumber(timestamp)) {
      parameter = `?date_time=${encodeURIComponent(this.datetimeService.convertTimestampToTimeZoneFormat(timestamp))}`
    }

    const { data }= await firstValueFrom(
      this.httpService.get(`${url}${parameter ? parameter : ''}`).pipe(catchError((error: AxiosError) => {
        this.logger.error(error)
        throw new BadRequestException('Unable to retrieve traffic API details!')
      }))
    )

    return GovSgTrafficSuccessResponse.convertAxiosResponseToDto(data)
  }
}