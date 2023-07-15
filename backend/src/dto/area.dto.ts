import { ApiProperty } from "@nestjs/swagger";

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
  lastUpdateTimestamp: number;
  @ApiProperty()
  validFrom: number;
  @ApiProperty()
  validTo: number;
  @ApiProperty()
  isArchived: boolean;
  @ApiProperty()
  areaPky: number;
}

export class AreaWithWeatherDto {
  @ApiProperty({ type: WeatherForecastDto, isArray: true })
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