import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { TrafficInformationService } from "./traffic-information.interface";
import { TrafficListRequestDto, TrafficRequestDto } from "@/dto/traffic-information.dto";
import { Camera, Prisma, TrafficCapture } from "@prisma/client";
import { CAMERA_SERVICE, CameraService } from "../camera/camera.interface";
import { TRAFFIC_CAPTURE_SERVICE, TrafficCaptureService } from "../traffic-capture/traffic-capture.interface";
import { AREA_SERVICE, AreaService } from "../area/area.interface";
import { GOV_SG_TRAFFIC_TASK, GovSgTrafficTask } from "@/scheduler/gov-sg-traffic-task.service";

@Injectable()
export class TrafficInformationServiceImpl implements TrafficInformationService {
  protected logger = new Logger(TrafficInformationServiceImpl.name)
  constructor (
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService,
    @Inject(TRAFFIC_CAPTURE_SERVICE) protected readonly trafficCaptureService: TrafficCaptureService,
    @Inject(GOV_SG_TRAFFIC_TASK) protected readonly govSgTrafficTask: GovSgTrafficTask
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
    let trafficCaptures = await Promise.all(requestDto.cameraIds.map(async (id) => {
      return this.trafficCaptureService.retrieveLastTrafficCaptureFromId(id, requestDto.datetime)
    }))

    const triggerAPI = trafficCaptures.some(capture => {
      return !capture || ((requestDto.datetime - Number(capture.capturedTimestamp)) > 20000)
    })

    if (triggerAPI) {
      await this.govSgTrafficTask.executeTask(requestDto.datetime)
      trafficCaptures = await Promise.all(requestDto.cameraIds.map(async (id) => {
        return this.trafficCaptureService.retrieveLastTrafficCaptureFromId(id, requestDto.datetime)
      }))
    }

    return trafficCaptures
  }
}