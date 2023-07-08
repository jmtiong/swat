import { SetMetadata } from "@nestjs/common";
import { Prisma, WeatherForecast } from "@prisma/client";

export const WEATHER_FORECAST_SERVICE= 'WeatherForecastService'
export const WeatherForecastService = () => SetMetadata(WEATHER_FORECAST_SERVICE, true)

export interface WeatherForecastService {
  retrieveListOfWeatherForecast (filter: Prisma.WeatherForecastFindManyArgs): Promise<WeatherForecast[]>
  retrieveWeatherForecast (pky: number): Promise<WeatherForecast>
  archiveWeatherForecast (pky: number): Promise<WeatherForecast>
  verifyWeatherForecast (pky: number): Promise<boolean>
  createWeatherForecastRecord (weatherForecast: WeatherForecast): Promise<WeatherForecast>
  updateWeatherForecastRecord (pky: number, weatherForecast: WeatherForecast): Promise<WeatherForecast>
}