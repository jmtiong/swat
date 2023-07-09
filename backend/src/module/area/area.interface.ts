import { Area, Prisma } from "@prisma/client";

export const AREA_SERVICE= 'AreaService'

export interface AreaService {
  countNumberOfAreas (): Promise<number>
  retrieveListOfArea (filter: Prisma.AreaFindManyArgs): Promise<Area[]>
  retrieveArea (pky: number): Promise<Area>
  createArea (area: Area): Promise<Area>
  createManyAreas (areas: Area[]): Promise<number>
  updateArea (pky: number, area: Area): Promise<Area>
  retrieveClosestArea (lat: number, long: number): Promise<Area>
}