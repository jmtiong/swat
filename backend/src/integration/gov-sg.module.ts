import { Module } from "@nestjs/common";
import { GovSgTrafficService } from "./gov-sg-traffic.service";
import { GovSgWeatherService } from "./gov-sg-weather.service";
import { HttpModule } from "@nestjs/axios";
import { AreaInitializationService } from "./area-initialization.service";
import { CameraInitializationService } from "./camera-initialization.service";
import { CoreDomainModule } from "@/module/core-domain.module";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    CoreDomainModule
  ],
  providers: [GovSgTrafficService, GovSgWeatherService, AreaInitializationService, CameraInitializationService],
  exports: [GovSgTrafficService, GovSgWeatherService, AreaInitializationService, CameraInitializationService]
})
export class GovSgModule {}