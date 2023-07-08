import { SetMetadata } from "@nestjs/common";
import { Area, Prisma } from "@prisma/client";

export const AREA_SERVICE= 'AreaService'
export const AreaService = () => SetMetadata(AREA_SERVICE, true)

export interface AreaService {
  retrieveListOfArea (filter: Prisma.AreaFindManyArgs): Promise<Area>
  retrieveArea (pky: number): Promise<Area>
  createArea (area: Area): Promise<Area>
  updateArea (pky: number, area: Area): Promise<Area>
}