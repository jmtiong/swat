import { Module } from "@nestjs/common";
import { WeatherInformationController } from "./weather-information.controller";
import { WEATHER_INFORMATION_SERVICE } from "./weather-information.interface";
import { WeatherInformationServiceImpl } from "./weather-information.service";
import { CoreDomainModule } from "../core-domain.module";

@Module({
  imports: [CoreDomainModule],
  controllers: [WeatherInformationController],
  providers: [
    {
      provide: WEATHER_INFORMATION_SERVICE,
      useClass: WeatherInformationServiceImpl
    }
  ]
})
export class WeatherInformationModule {}