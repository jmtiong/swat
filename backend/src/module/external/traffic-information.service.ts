import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TrafficInformationService } from "./traffic-information.interface";
import { TrafficListRequestDto, TrafficRequestDto } from "@/dto/traffic-information.dto";
import { Camera, Prisma, TrafficCapture } from "@prisma/client";
import { CAMERA_SERVICE, CameraService } from "../camera/camera.interface";
import { TRAFFIC_CAPTURE_SERVICE, TrafficCaptureService } from "../traffic-capture/traffic-capture.interface";
import { AREA_SERVICE, AreaService } from "../area/area.interface";

@Injectable()
export class TrafficInformationServiceImpl implements TrafficInformationService {
  constructor (
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService,
    @Inject(TRAFFIC_CAPTURE_SERVICE) protected readonly trafficCaptureService: TrafficCaptureService
  ) {}
  async retrieveListOfCamerasFromArea(areaName: string): Promise<Camera[]> {
    const area = await this.areaService.retrieveArea(areaName)
    if (!area) {
      throw new BadRequestException(`There is no such area ${areaName} to display.`)
    }

    return this.cameraService.retrieveListOfCamera({
      where: {
        areaPky: area.pky
      }
    })
  }
  async retrieveCameraTrafficCapture(requestDto: TrafficRequestDto): Promise<TrafficCapture> {
    const camera = await this.cameraService.retrieveCameraFromId(requestDto.cameraId)

    if (!camera) {
      throw new BadRequestException(`There is no such camera ${requestDto.cameraId} to display traffics.`)
    }

    return this.trafficCaptureService.retrieveLastTrafficCaptureFromId(camera.cameraId, requestDto.datetime)
  }
  async retrieveCameraTrafficCaptureList(requestDto: TrafficListRequestDto): Promise<TrafficCapture[]> {
    const trafficCaptures = await Promise.all(requestDto.cameraIds.map(async (id) => {
      return this.trafficCaptureService.retrieveLastTrafficCaptureFromId(id, requestDto.datetime)
    }))

    return trafficCaptures
  }
}