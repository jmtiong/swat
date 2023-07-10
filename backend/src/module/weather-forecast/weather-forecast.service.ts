import { BadRequestException, Injectable } from "@nestjs/common";
import { WeatherForecastService } from "./weather-forecast.interface";
import { Prisma, WeatherForecast } from "@prisma/client";
import { DefaultArgs, GetResult } from "@prisma/client/runtime";
import { PrismaService } from "@/util/prisma.service";

@Injectable()
export class WeatherForecastServiceImpl implements WeatherForecastService {
  constructor (
    protected readonly prismaService: PrismaService
  ) {}

  async retrieveListOfWeatherForecast(filter: Prisma.WeatherForecastFindManyArgs<DefaultArgs>) {
    return this.prismaService.weatherForecast.findMany(filter)
  }

  async retrieveWeatherForecast(pky: number) {
    return this.prismaService.weatherForecast.findUnique({
      where: {
        pky
      }
    })
  }

  async archiveWeatherForecast(pky: number) {
    return this.prismaService.weatherForecast.update({
      where: {
        pky
      },
      data: {
        isArchived: true
      }
    })
  }

  async verifyWeatherForecast(pky: number) {
    return true
  }

  async createWeatherForecastRecord(weatherForecast: WeatherForecast) {
    delete weatherForecast.pky // always remove pky
    return this.prismaService.weatherForecast.create({
      data: {
        ...weatherForecast
      }
    })
  }

  async updateWeatherForecastRecord(pky: number, weatherForecast: WeatherForecast) {
    const existing = await this.prismaService.weatherForecast.findUnique({
      where: {
        pky
      }
    })

    if (!existing) {
      throw new BadRequestException('No such weather forecast to update')
    }

    return this.prismaService.weatherForecast.update({
      where: {
        pky
      },
      data: weatherForecast
    })
  }
}