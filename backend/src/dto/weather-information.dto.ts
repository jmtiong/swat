import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class WeatherRequestDto {
  @ApiProperty()
  @IsString()
  area: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  datetime: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  date: number
}

export class WeatherListRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  datetime: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  date: number
}

export class MultipleAreaWeatherForecastsResponse {
}