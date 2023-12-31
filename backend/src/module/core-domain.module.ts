import { Module } from "@nestjs/common";
import { AREA_SERVICE } from "./area/area.interface";
import { AreaServiceImpl } from "./area/area.service";
import { CAMERA_SERVICE } from "./camera/camera.interface";
import { CameraServiceImpl } from "./camera/camera.service";
import { TRAFFIC_CAPTURE_SERVICE } from "./traffic-capture/traffic-capture.interface";
import { TrafficCaptureImpl } from "./traffic-capture/traffic-capture.service";
import { WEATHER_FORECAST_SERVICE } from "./weather-forecast/weather-forecast.interface";
import { WeatherForecastServiceImpl } from "./weather-forecast/weather-forecast.service";
import { GeoLocationMatcherService } from "@/util/geolocation-matcher.service";

/**
 * Put all core domains here. Usually we will create
 * each domain's module separately.
 * 
 * For the sake of time, we shall put all here
 */
@Module({
  providers: [
    GeoLocationMatcherService,
    {
      provide: AREA_SERVICE,
      useClass: AreaServiceImpl
    },
    {
      provide: CAMERA_SERVICE,
      useClass: CameraServiceImpl
    },
    {
      provide: TRAFFIC_CAPTURE_SERVICE,
      useClass: TrafficCaptureImpl
    },
    {
      provide: WEATHER_FORECAST_SERVICE,
      useClass: WeatherForecastServiceImpl
    }
  ],
  exports: [
    {
      provide: AREA_SERVICE,
      useClass: AreaServiceImpl
    },
    {
      provide: CAMERA_SERVICE,
      useClass: CameraServiceImpl
    },
    {
      provide: TRAFFIC_CAPTURE_SERVICE,
      useClass: TrafficCaptureImpl
    },
    {
      provide: WEATHER_FORECAST_SERVICE,
      useClass: WeatherForecastServiceImpl
    }
  ]
})
export class CoreDomainModule {}