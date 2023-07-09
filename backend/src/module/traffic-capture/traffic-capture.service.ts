import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, TrafficCapture } from "@prisma/client";
import { TrafficCaptureService } from "./traffic-capture.interface";
import { DefaultArgs } from "@prisma/client/runtime";
import { PrismaService } from "@/util/prisma.service";
import { CAMERA_SERVICE, CameraService } from "../camera/camera.interface";

@Injectable()
export class TrafficCaptureImpl implements TrafficCaptureService {
  protected logger = new Logger(TrafficCaptureImpl.name)

  constructor (
    protected readonly prismaService: PrismaService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService
  ) {}
  retrieveListOfTrafficCapture(filter: Prisma.TrafficCaptureFindManyArgs<DefaultArgs>): Promise<TrafficCapture[]> {
    return this.prismaService.trafficCapture.findMany(filter)
  }
  retrieveTrafficCapture(pky: number): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
  async retrieveLastTrafficCaptureFromId(cameraId: string): Promise<TrafficCapture> {
    const camera = await this.cameraService.retrieveCameraFromId(cameraId)
    return this.prismaService.trafficCapture.findFirst({
      where: {
        cameraPky: camera.pky
      },
      orderBy: {
        capturedTimestamp: 'desc'
      }
    })
  }
  createTrafficCapture(trafficCapture: TrafficCapture): Promise<TrafficCapture> {
    return this.prismaService.trafficCapture.create({
      data: trafficCapture
    })
  }
  updateTrafficCapture(pky: number, trafficCapture: TrafficCapture): Promise<TrafficCapture> {
    return this.prismaService.trafficCapture.update({
      where: {
        pky
      },
      data: trafficCapture
    })
  }
}