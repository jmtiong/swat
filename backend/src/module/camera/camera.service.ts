import { Camera, Prisma } from "@prisma/client";
import { DefaultArgs, GetResult } from "@prisma/client/runtime";
import { Injectable } from "@nestjs/common";
import { CameraService } from "./camera.interface";
import { PrismaService } from "@/util/prisma.service";

@Injectable()
export class CameraServiceImpl implements CameraService {
  constructor (
    protected readonly prismaService: PrismaService
  ) {}
  countNumberOfCameras(): Promise<number> {
    return this.prismaService.camera.count()
  }
  retrieveListOfCamera(filter: Prisma.CameraFindManyArgs<DefaultArgs>): Promise<Camera[]> {
    return this.prismaService.camera.findMany(filter)
  }
  retrieveCamera(pky: number): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  retrieveCameraFromId(id: string): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  createCamera(camera: Camera): Promise<Camera> {
    return this.prismaService.camera.create({
      data: camera
    })
  }
  async createManyCameras(cameras: Camera[]): Promise<number> {
    const result = await this.prismaService.camera.createMany({
      data: cameras
    })

    return result.count
  }
  updateCamera(pky: number, camera: Camera): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
}