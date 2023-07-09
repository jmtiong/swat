import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TrafficRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cameraId: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  datetime: number
}
