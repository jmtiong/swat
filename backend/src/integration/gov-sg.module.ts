import { Module } from "@nestjs/common";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { GovSgWeatherService } from "./gov-sg-weather.service";

@Module({
  providers: [GovSgTrafficService, GovSgWeatherService],
  exports: [GovSgTrafficService, GovSgWeatherService]
})
export class GovSgModule {}