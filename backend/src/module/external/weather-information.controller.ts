import { Body, Controller, Inject, Post, Version } from "@nestjs/common";
import { WEATHER_INFORMATION_SERVICE, WeatherInformationService } from "./weather-information.interface";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { WeatherListRequestDto, WeatherRequestDto } from "@/dto/weather-information.dto";
import { AreaWithWeatherModel } from "@/model/models";
import { AreaWithWeatherDto, WeatherForecastDto } from "@/dto/area.dto";

@ApiTags('Environment')
@Controller('environment')
export class WeatherInformationController {
  constructor (
    @Inject(WEATHER_INFORMATION_SERVICE) protected readonly weatherInformationService: WeatherInformationService
  ) {}

  @Post('2-hour-area-weather-forecast')
  @ApiBody({ type: WeatherListRequestDto })
  @ApiOkResponse({ type: AreaWithWeatherDto, isArray: true })
  @Version('1')
  async retrieveListOfAreaWeatherForecast (@Body() weatherRequestDto: WeatherListRequestDto) {
    return this.weatherInformationService.retrieveListOfWeatherForecastInformation(weatherRequestDto)
  }

  @Post('2-hour-forecast')
  @ApiBody({ type: WeatherRequestDto })
  @ApiOkResponse({ type: WeatherForecastDto, isArray: true })
  @Version('1')
  async retrieveAreaWeatherForecast (@Body() requestDto: WeatherRequestDto) {
    return this.weatherInformationService.retrieveAreaWeatherForecastInformation(requestDto)
  }
}