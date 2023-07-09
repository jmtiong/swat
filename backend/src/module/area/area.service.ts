import { Area, Prisma } from "@prisma/client";
import { DefaultArgs, GetResult, Decimal } from "@prisma/client/runtime";
import { AreaService } from "./area.interface";
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
  async retrieveListOfArea(filter: Prisma.AreaFindManyArgs<DefaultArgs>): Promise<(Area)[]> {
    return this.prismaService.area.findMany(filter)
  }
  retrieveArea(pky: number): Promise<Area> {
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
  }
  async retrieveClosestArea(lat: number, long: number): Promise<Area> {
    const areas = await this.retrieveListOfArea({})

    const toMatch = new LatLong()
    toMatch.lat = Number(lat)
    toMatch.long = Number(long)
    return this.geoLocationMatcherService.findClosest(areas, toMatch)
  }
}