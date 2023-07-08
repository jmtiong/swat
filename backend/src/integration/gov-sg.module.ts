import { Module } from "@nestjs/common";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { GovSgWeatherService } from "./gov-sg-weather.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  providers: [GovSgTrafficService, GovSgWeatherService],
  exports: [GovSgTrafficService, GovSgWeatherService]
})
export class GovSgModule {}