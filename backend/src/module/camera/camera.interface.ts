import { Camera, Prisma } from "@prisma/client";

export interface CameraService {
  retrieveListOfCamera (filter: Prisma.CameraFindManyArgs): Promise<Camera>
  retrieveCamera (pky: number): Promise<Camera>
  createCamera (camera: Camera): Promise<Camera>
  updateCamera (pky: number, camera: Camera): Promise<Camera>
}