import { Area, Prisma } from "@prisma/client";

export interface AreaService {
  retrieveListOfArea (filter: Prisma.AreaFindManyArgs): Promise<Area>
  retrieveArea (pky: number): Promise<Area>
  createArea (area: Area): Promise<Area>
  updateArea (pky: number, area: Area): Promise<Area>
}