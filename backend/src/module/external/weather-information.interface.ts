import { WeatherListRequestDto, WeatherRequestDto } from "@/dto/weather-information.dto"
import { WeatherForecast } from "@prisma/client"
import { AreaWithWeathers } from "../area/area.interface"

export const WEATHER_INFORMATION_SERVICE = 'WeatherInformationService'

export interface WeatherInformationService {
  retrieveAreaWeatherForecastInformation (requestDto: WeatherRequestDto): Promise<WeatherForecast[]>
  retrieveListOfWeatherForecastInformation (requestDto: WeatherListRequestDto): Promise<AreaWithWeathers[]>
}