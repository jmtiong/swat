import { Area, Prisma } from "@prisma/client";

export const AREA_SERVICE= 'AreaService'

export interface AreaService {
  retrieveListOfArea (filter: Prisma.AreaFindManyArgs): Promise<Area[]>
  retrieveArea (pky: number): Promise<Area>
  createArea (area: Area): Promise<Area>
  updateArea (pky: number, area: Area): Promise<Area>
  retrieveClosestArea (lat: number, long: number): Promise<Area>
}