import { ApiProperty } from "@nestjs/swagger";

export class CameraDto {
  @ApiProperty()
  pky: number;
  @ApiProperty()
  ctm: number;
  @ApiProperty()
  utm: number;
  @ApiProperty()
  cameraId: string;
  @ApiProperty()
  lat: number;
  @ApiProperty()
  long: number;
  @ApiProperty()
  areaPky: number;
}

export class TrafficCaptureDto {
  @ApiProperty()
  pky: number;
  @ApiProperty()
  ctm: number;
  @ApiProperty()
  utm: number;
  @ApiProperty()
  url: string;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  width: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  isArchived: boolean;
  @ApiProperty()
  capturedTimestamp: number;
  @ApiProperty()
  cameraPky: number;
}