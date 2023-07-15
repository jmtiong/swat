import { SchedulerSetting } from "@prisma/client";
import { CronJob, CronTime } from "cron";

export interface ScheduleTask {
  setupSettings (jobSetting: SchedulerSetting)
  initiateJob (frequency: CronTime): CronJob
  executeTask (datetime: number)
}