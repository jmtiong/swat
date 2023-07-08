import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EssentialModule } from './util/essential.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), EssentialModule, ScheduleModule.forRoot(), SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
