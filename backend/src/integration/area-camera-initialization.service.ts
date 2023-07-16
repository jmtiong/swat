import { GovSgWeatherService } from "@/integration/gov-sg-weather.service";
import { AreaModel, CameraModel } from "@/model/models";
import { AREA_SERVICE, AreaService } from "@/module/area/area.interface";
import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Area, Camera, SystemConfiguration } from "@prisma/client";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { CAMERA_SERVICE, CameraService } from "@/module/camera/camera.interface";
import { PrismaService } from "@/util/prisma.service";
import { ApiName } from "@/enum/enum";

@Injectable()
export class AreaCameraInitializationService implements OnApplicationBootstrap {
  protected logger = new Logger(AreaCameraInitializationService.name)
  constructor (
    protected readonly prismaService: PrismaService,
    protected readonly govSgWeatherService: GovSgWeatherService,
    protected readonly govSgTrafficService: GovSgTrafficService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService
  ) {}
  async onApplicationBootstrap() {
    const weatherConfig = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: ApiName.GOV_SG_TWO_HOUR_WEATHER_URL
      }
    })

    if (!weatherConfig) {
      const config = await this.prismaService.systemConfiguration.create({
        data: {
          module: 'GOV_SG',
          name: ApiName.GOV_SG_TWO_HOUR_WEATHER_URL,
          value: 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast',
          version: '1'
        } as SystemConfiguration
      })
      this.logger.log(`Added default system configuration for ${ApiName.GOV_SG_TWO_HOUR_WEATHER_URL}`)
    }

    const trafficConfig = await this.prismaService.systemConfiguration.findUnique({
      where: {
        name: ApiName.GOV_SG_TRAFFIC_URL
      }
    })

    if (!trafficConfig) {
      const config = await this.prismaService.systemConfiguration.create({
        data: {
          module: 'GOV_SG',
          name: ApiName.GOV_SG_TRAFFIC_URL,
          value: 'https://api.data.gov.sg/v1/transport/traffic-images',
          version: '1'
        } as SystemConfiguration
      })
      this.logger.log(`Added default system configuration for ${ApiName.GOV_SG_TRAFFIC_URL}`)
    }

    const areas = await this.areaService.countNumberOfAreas()

    if (areas !== 0) { return }

    const response = await this.govSgWeatherService.retrieveTwoHourForecasts()
    const areaMetadatas = response.areaMetadata

    const areasToCreate = areaMetadatas.map(metadata => {
      const area = new AreaModel()
      return area.populateFromGovSgData(metadata)
    })

    const createdAreas = await this.areaService.createManyAreas(areasToCreate.map(area => area.sanitizeToDatabaseFormat() as Area))

    this.logger.log(`A total of ${createdAreas} areas were created.`)

    const existingCameras = await this.cameraService.countNumberOfCameras()

    if (existingCameras !== 0) { return }

    const cameraResponse = await this.govSgTrafficService.retrieveTransportTrafficImages()
    const { cameras } = cameraResponse.items[0]

    const camerasToCreate = await Promise.all(cameras.map(async (camera) => {
      const cameraModel = new CameraModel()
      cameraModel.populateFromGovSgData(camera)
      const { lat, long } = cameraModel
      const area = await this.areaService.retrieveClosestArea(lat, long)
      return cameraModel.populateArea(area)
    }))
    const createdCameras = await this.cameraService.createManyCameras(camerasToCreate.map(camera => camera.sanitizeToDatabaseFormat() as Camera))

    this.logger.log(`A total of ${createdCameras} cameras were created.`)
  }
}