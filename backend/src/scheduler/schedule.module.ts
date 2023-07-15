import { Module } from "@nestjs/common";
import { SchedulerFactory } from "./schedule.factory";
import { SchedulerService } from "./scheduler.service";
import { GOV_SG_TRAFFIC_TASK, GovSgTrafficTask } from "./gov-sg-traffic-task.service";
import { GOV_SG_WEATHER_TASK, GovSgWeatherTask } from "./gov-sg-weather-task.service";
import { CoreDomainModule } from "@/module/core-domain.module";
import { GovSgModule } from "@/integration/gov-sg.module";

@Module({
  imports: [CoreDomainModule, GovSgModule],
  providers: [
    SchedulerFactory,
    SchedulerService,
    {
      provide: GOV_SG_TRAFFIC_TASK,
      useClass: GovSgTrafficTask
    },
    {
      provide: GOV_SG_WEATHER_TASK,
      useClass: GovSgWeatherTask
    }
  ],
  exports: [
    {
      provide: GOV_SG_TRAFFIC_TASK,
      useClass: GovSgTrafficTask
    },
    {
      provide: GOV_SG_WEATHER_TASK,
      useClass: GovSgWeatherTask
    }
  ]
})
export class SchedulerModule {}