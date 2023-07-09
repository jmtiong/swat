import { Camera, Prisma } from "@prisma/client";

export const CAMERA_SERVICE= 'CameraService'
export interface CameraService {
  countNumberOfCameras (): Promise<number>
  retrieveListOfCamera (filter: Prisma.CameraFindManyArgs): Promise<Camera[]>
  retrieveCamera (pky: number): Promise<Camera>
  retrieveCameraFromId (id: string): Promise<Camera>
  createCamera (camera: Camera): Promise<Camera>
  createManyCameras(cameras: Camera[]): Promise<number>
  updateCamera (pky: number, camera: Camera): Promise<Camera>
}