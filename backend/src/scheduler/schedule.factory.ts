import { TaskType } from "@/enum/enum";
import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { GOV_SG_TRAFFIC_TASK } from "./gov-sg-traffic-task.service";
import { GOV_SG_WEATHER_TASK } from "./gov-sg-weather-task.service";
import { ScheduleTask } from "./schedule-task.interface";

@Injectable()
export class SchedulerFactory {
  constructor (
    protected readonly moduleRef: ModuleRef
  ) {}

  generateService (name: TaskType): ScheduleTask {
    switch (name) {
      case TaskType.GOV_SG_TRAFFIC_TASK:
        return this.moduleRef.get(GOV_SG_TRAFFIC_TASK)
      case TaskType.GOV_SG_WEATHER_TASK:
        return this.moduleRef.get(GOV_SG_WEATHER_TASK)
    }
  }
}