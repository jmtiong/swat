import { SetMetadata } from "@nestjs/common";
import { TrafficCapture, Prisma } from "@prisma/client";

export const TRAFFICE_CAPTURE_SERVICE= 'TrafficCaptureService'
export const TrafficCaptureService = () => SetMetadata(TRAFFICE_CAPTURE_SERVICE, true)

export interface TrafficCaptureService {
  retrieveListOfTrafficCapture (filter: Prisma.TrafficCaptureFindManyArgs): Promise<TrafficCapture>
  retrieveTrafficCapture (pky: number): Promise<TrafficCapture>
  createTrafficCapture (trafficCapture: TrafficCapture): Promise<TrafficCapture>
  updateTrafficCapture (pky: number, trafficCapture: TrafficCapture): Promise<TrafficCapture>
}