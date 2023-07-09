import { TrafficRequestDto } from "@/dto/traffic-information.dto";
import { Camera, TrafficCapture } from "@prisma/client";

export const TRAFFIC_INFORMATION_SERVICE = 'TrafficInformationService'

export interface TrafficInformationService {
  retrieveListOfCamerasFromArea (areaName: string): Promise<Camera[]>
  retrieveCameraTrafficCapture (requestDto: TrafficRequestDto): Promise<TrafficCapture>
}