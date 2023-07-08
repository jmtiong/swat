import { Camera, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";
import { Injectable } from "@nestjs/common";
import { CameraService } from "./camera.interface";

@Injectable()
export class CameraServiceImpl implements CameraService {
  retrieveListOfCamera(filter: Prisma.CameraFindManyArgs<DefaultArgs>): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  retrieveCamera(pky: number): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  retrieveCameraFromId(id: string): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  createCamera(camera: Camera): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
  updateCamera(pky: number, camera: Camera): Promise<Camera> {
    throw new Error("Method not implemented.");
  }
}