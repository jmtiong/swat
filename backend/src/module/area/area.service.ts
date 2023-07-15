import { Area, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";
import { AreaService, AreaWithWeathers } from "./area.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/util/prisma.service";
import { GeoLocationMatcherService } from "@/util/geolocation-matcher.service";
import { LatLong } from "@/model/models";

@Injectable()
export class AreaServiceImpl implements AreaService {
  constructor (
    protected readonly prismaService: PrismaService,
    protected readonly geoLocationMatcherService: GeoLocationMatcherService
  ) {}
  async retrieveListOfAreaWithWeathers(filter: Prisma.AreaFindManyArgs<DefaultArgs>): Promise<AreaWithWeathers[]> {
    // @TODO: To specify more defined filter arguments so that it will include weathers type.
    return this.prismaService.area.findMany(filter) as Promise<AreaWithWeathers[]>
  }
  retrieveArea(name: string) {
    return this.prismaService.area.findUnique({
      where: {
        name
      },
      include: {
        weatherForecast: true
      }
    })
  }
  createArea(area: Area): Promise<Area> {
    return this.prismaService.area.create({
      data: area
    })
  }

  async createManyAreas(areas: Area[]): Promise<number> {
    const result = await this.prismaService.area.createMany({
      data: areas
    })

    return result.count
  }

  countNumberOfAreas(): Promise<number> {
      return this.prismaService.area.count()
  }
  updateArea(pky: number, area: Area): Promise<Area> {
    return this.prismaService.area.update({
      where: {
        pky
      },
      data: area
    })
  }
  async retrieveClosestArea(lat: number, long: number): Promise<Area> {
    const areas = await this.retrieveListOfAreaWithWeathers({})

    const toMatch = new LatLong()
    toMatch.lat = Number(lat)
    toMatch.long = Number(long)
    return this.geoLocationMatcherService.findClosest(areas, toMatch)
  }
}