import { Area, Prisma } from "@prisma/client";
import { DefaultArgs, GetResult, Decimal } from "@prisma/client/runtime";
import { AreaService } from "./area.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AreaServiceImpl implements AreaService {
  retrieveListOfArea(filter: Prisma.AreaFindManyArgs<DefaultArgs>): Promise<(Area)[]> {
    throw new Error("Method not implemented.");
  }
  retrieveArea(pky: number): Promise<Area> {
    throw new Error("Method not implemented.");
  }
  createArea(area: Area): Promise<Area> {
    throw new Error("Method not implemented.");
  }
  updateArea(pky: number, area: Area): Promise<Area> {
    throw new Error("Method not implemented.");
  }
  retrieveClosestArea(lat: number, long: number): Promise<Area> {
    throw new Error("Method not implemented.");
  }
}