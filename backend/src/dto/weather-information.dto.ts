import { ApiProperty } from "@nestjs/swagger"
import { ArrayMaxSize, IsArray, IsNumber, IsOptional, IsString } from "class-validator"

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
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(3)
  areas: string[]

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