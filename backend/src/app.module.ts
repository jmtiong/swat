import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EssentialModule } from './util/essential.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WeatherInformationModule } from './module/external/weather-information.module';
import { TrafficInformationModule } from './module/external/traffic-information.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EssentialModule, ScheduleModule.forRoot(), SchedulerModule, WeatherInformationModule, TrafficInformationModule
  ]
})
export class AppModule {}
