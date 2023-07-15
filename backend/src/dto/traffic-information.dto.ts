import { IsBeforeNow } from "@/decorator/is-after-now.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { TrafficCapture } from "@prisma/client";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TrafficRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cameraId: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  datetime: number
}

export class TrafficListRequestDto {
  @ApiProperty()
  @IsArray()
  cameraIds: string[]

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  datetime: number
}