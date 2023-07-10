import { Module } from "@nestjs/common";
import { TrafficInformationController } from "./traffic-information.controller";
import { TRAFFIC_INFORMATION_SERVICE } from "./traffic-information.interface";
import { TrafficInformationServiceImpl } from "./traffic-information.service";
import { CoreDomainModule } from "../core-domain.module";

@Module({
  imports: [CoreDomainModule],
  controllers: [TrafficInformationController],
  providers: [
    {
      provide: TRAFFIC_INFORMATION_SERVICE,
      useClass: TrafficInformationServiceImpl
    }
  ]
})
export class TrafficInformationModule {}