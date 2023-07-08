import { TrafficCapture, Prisma } from "@prisma/client";

export interface TrafficCaptureService {
  retrieveListOfTrafficCapture (filter: Prisma.TrafficCaptureFindManyArgs): Promise<TrafficCapture>
  retrieveTrafficCapture (pky: number): Promise<TrafficCapture>
  createTrafficCapture (trafficCapture: TrafficCapture): Promise<TrafficCapture>
  updateTrafficCapture (pky: number, trafficCapture: TrafficCapture): Promise<TrafficCapture>
}