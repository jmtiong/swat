import { TrafficCapture, Prisma } from "@prisma/client";

export const TRAFFIC_CAPTURE_SERVICE= 'TrafficCaptureService'

export interface TrafficCaptureService {
  retrieveListOfTrafficCapture (filter: Prisma.TrafficCaptureFindManyArgs): Promise<TrafficCapture[]>
  retrieveTrafficCapture (pky: number): Promise<TrafficCapture>
  retrieveLastTrafficCaptureFromId (cameraId: string, timestamp?: number): Promise<TrafficCapture>
  createTrafficCapture (trafficCapture: TrafficCapture): Promise<TrafficCapture>
  updateTrafficCapture (pky: number, trafficCapture: TrafficCapture): Promise<TrafficCapture>
}