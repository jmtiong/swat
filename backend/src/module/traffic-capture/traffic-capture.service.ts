import { Injectable } from "@nestjs/common";
import { Prisma, TrafficCapture } from "@prisma/client";
import { TrafficCaptureService } from "./traffic-capture.interface";
import { DefaultArgs } from "@prisma/client/runtime";

@Injectable()
export class TrafficCaptureImpl implements TrafficCaptureService {
  retrieveListOfTrafficCapture(filter: Prisma.TrafficCaptureFindManyArgs<DefaultArgs>): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
  retrieveTrafficCapture(pky: number): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
  retrieveLastTrafficCaptureFromId(cameraId: string): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
  createTrafficCapture(trafficCapture: TrafficCapture): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
  updateTrafficCapture(pky: number, trafficCapture: TrafficCapture): Promise<TrafficCapture> {
    throw new Error("Method not implemented.");
  }
}