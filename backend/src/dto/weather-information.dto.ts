import { IsBeforeNow } from "@/decorator/is-after-now.decorator"
import { ApiProperty } from "@nestjs/swagger"
import { ArrayMaxSize, IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class WeatherRequestDto {
  @ApiProperty()
  @IsString()
  area: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  datetime: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  date: number
}

export class WeatherListRequestDto {
  @ApiProperty({ type: String, isArray: true})
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(3)
  areas: string[]

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  datetime: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsBeforeNow()
  date: number
}

export class MultipleAreaWeatherForecastsResponse {
}