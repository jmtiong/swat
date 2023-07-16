import { Module } from "@nestjs/common";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { GovSgWeatherService } from "./gov-sg-weather.service";
import { HttpModule } from "@nestjs/axios";
import { CoreDomainModule } from "@/module/core-domain.module";
import { AreaCameraInitializationService } from "./area-camera-initialization.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 5
    }),
    CoreDomainModule
  ],
  providers: [GovSgTrafficService, GovSgWeatherService, AreaCameraInitializationService],
  exports: [GovSgTrafficService, GovSgWeatherService, AreaCameraInitializationService]
})
export class GovSgModule {}