import { ApiProperty } from "@nestjs/swagger";

export class AreaWithWeatherDto {
  @ApiProperty()
  weatherForecast: WeatherForecastDto[];
  @ApiProperty()
  pky: number;
  @ApiProperty()
  ctm: number;
  @ApiProperty()
  utm: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lat: number;
  @ApiProperty()
  long: number;
}

export class WeatherForecastDto {
  @ApiProperty()
  pky: number;
  @ApiProperty()
  ctm: number;
  @ApiProperty()
  utm: number;
  @ApiProperty()
  forecast: string;
  @ApiProperty()
  castType: string;
  @ApiProperty()
  lastUpdateTimestamp: string;
  @ApiProperty()
  validFrom: string;
  @ApiProperty()
  validTo: string;
  @ApiProperty()
  isArchived: boolean;
  @ApiProperty()
  areaPky: number;
}