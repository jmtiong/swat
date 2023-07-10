
import { PrismaService } from "@/util/prisma.service";
import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { CameraModel } from "@/model/models";
import { AREA_SERVICE, AreaService } from "@/module/area/area.interface";
import { Camera } from "@prisma/client";
import { CAMERA_SERVICE, CameraService } from "@/module/camera/camera.interface";

@Injectable()
export class CameraInitializationService implements OnApplicationBootstrap {
  protected logger = new Logger(CameraInitializationService.name)
  constructor (
    protected readonly prismaService: PrismaService,
    protected readonly govSgTrafficService: GovSgTrafficService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService
  ) {}
  async onApplicationBootstrap() {
    const existingCameras = await this.prismaService.camera.count()

    if (existingCameras !== 0) { return }

    const response = await this.govSgTrafficService.retrieveTransportTrafficImages()
    const { cameras } = response.items[0]

    const camerasToCreate = await Promise.all(cameras.map(async (camera) => {
      const cameraModel = new CameraModel()
      cameraModel.populateFromGovSgData(camera)
      const { lat, long } = cameraModel
      const area = await this.areaService.retrieveClosestArea(lat, long)
      return cameraModel.populateArea(area)
    }))
    const createdCameras = await this.prismaService.camera.createMany({
      data: camerasToCreate.map(camera => camera.sanitizeToDatabaseFormat() as Camera)
    })

    this.logger.log(`A total of ${createdCameras} cameras were created.`)
  }
}