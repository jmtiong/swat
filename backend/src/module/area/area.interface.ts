import { Area, Prisma, WeatherForecast } from "@prisma/client";

export const AREA_SERVICE= 'AreaService'

export const areaWithWeathers = Prisma.validator<Prisma.AreaArgs>()({
  include: { weatherForecast: true }
})

export type AreaWithWeathers = Prisma.AreaGetPayload<typeof areaWithWeathers>

export interface AreaService {
  countNumberOfAreas (): Promise<number>
  retrieveListOfAreaWithWeathers (filter: Prisma.AreaFindManyArgs): Promise<AreaWithWeathers[]>
  retrieveArea (name: string): Promise<AreaWithWeathers>
  createArea (area: Area): Promise<Area>
  createManyAreas (areas: Area[]): Promise<number>
  updateArea (pky: number, area: Area): Promise<Area>
  retrieveClosestArea (lat: number, long: number): Promise<Area>
}