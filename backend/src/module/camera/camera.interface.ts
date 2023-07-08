import { SetMetadata } from "@nestjs/common";
import { Camera, Prisma } from "@prisma/client";

export const CAMERA_SERVICE= 'CameraService'
export const CameraService = () => SetMetadata(CAMERA_SERVICE, true)
export interface CameraService {
  retrieveListOfCamera (filter: Prisma.CameraFindManyArgs): Promise<Camera>
  retrieveCamera (pky: number): Promise<Camera>
  createCamera (camera: Camera): Promise<Camera>
  updateCamera (pky: number, camera: Camera): Promise<Camera>
}