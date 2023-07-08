import { GovSgWeatherForecastSuccessResponse } from "@/dto/gov-sg.dto";
import { DatetimeService } from "@/util/date-time.service";
import { PrismaService } from "@/util/prisma.service";
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
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

  async retrieveTwoHourForecasts (timestamp: bigint, dateTimestamp: bigint) {
    const url = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: 'gov-sg-two-hour-weather-url'
      }
    })

    if (!url) {
      throw new BadRequestException('There is no two hour weather url to retrieve from.')
    }

    let parameter = undefined
    if (isNumber(timestamp)) {
      parameter = `?date_time=${encodeURIComponent(this.datetimeService.convertTimestampToTimeZoneFormat(timestamp))}`
    } else if (isNumber(dateTimestamp)) {
      parameter = `?date=${encodeURIComponent(this.datetimeService.convertTimestampToTimeZoneFormat(dateTimestamp))}`
    }

    const { data }= await firstValueFrom(
      this.httpService.get(`${url}${parameter ? parameter : ''}`).pipe(catchError((error: AxiosError) => {
        this.logger.error(error)
        throw new BadRequestException('Unable to retrieve traffic API details!')
      }))
    )

    return GovSgWeatherForecastSuccessResponse.convertAxiosResponseToDto(data)
  }
}