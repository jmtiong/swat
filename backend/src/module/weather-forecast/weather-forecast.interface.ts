import { Prisma, WeatherForecast } from "@prisma/client";

export interface WeatherForecastService {
  retrieveListOfWeatherForecast (filter: Prisma.WeatherForecastFindManyArgs): Promise<WeatherForecast[]>
  retrieveWeatherForecast (pky: number): Promise<WeatherForecast>
  archiveWeatherForecast (pky: number): Promise<WeatherForecast>
  verifyWeatherForecast (pky: number): Promise<boolean>
  createWeatherForecastRecord (weatherForecast: WeatherForecast): Promise<WeatherForecast>
  updateWeatherForecastRecord (pky: number, weatherForecast: WeatherForecast): Promise<WeatherForecast>
}