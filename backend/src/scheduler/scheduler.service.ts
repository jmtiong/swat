import { ScheduleFrequency, convertToTaskType } from "@/enum/enum";
import { PrismaService } from "@/util/prisma.service";
import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { SchedulerSetting } from "@prisma/client";
import { CronJob, CronTime } from "cron";
import { SchedulerFactory } from "./schedule.factory";

@Injectable()
export class SchedulerService implements OnApplicationBootstrap {
  protected logger = new Logger(SchedulerService.name)

  constructor (
    protected readonly prismaService: PrismaService,
    protected readonly scheduleRegistry: SchedulerRegistry,
    protected readonly scheduleFactory: SchedulerFactory
  ) {}

  async onApplicationBootstrap() {
    this.setupSchedules()
  }

  async setupSchedules () {
    this.logger.log('Setting up cron tasks...')
    const schedules = await this.prismaService.schedulerSetting.findMany({
      where: {
        enable: true
      },
      distinct: ['name']
    })

    schedules.forEach(schedule => {
      this.logger.log('Scheduling %s...', schedule.name)
      
      let cronJob: CronJob = null
      try {
        cronJob = this.scheduleRegistry.getCronJob(schedule.name)
      } catch (error) {
        this.logger.log(`${schedule.name} is not running in the first place.`)
      }
      
      if (cronJob) {
        cronJob.stop()
        this.scheduleRegistry.deleteCronJob(schedule.name)
      }
      
      const cronTime = this.generateCronTime(schedule)
      const service = this.scheduleFactory.generateService(convertToTaskType(schedule.name))
      service.setupSettings(schedule)
      cronJob = service.initiateJob(cronTime)

      this.logger.log(`${schedule.name} successfully started.`)
      this.logger.log(`${schedule.name} will run at ${cronJob.nextDate()}`)
    })
  }

  scheduleACronJob (nameOfJob: string, cronJob: CronJob, cronTime: CronTime) {
    try {
      this.scheduleRegistry.addCronJob(nameOfJob, cronJob)
      cronJob.setTime(cronTime)
      cronJob.start()
    } catch (error) {
      this.logger.error(error)
      throw new Error(`Unable to start ${nameOfJob} job.`)
    }
  }

  generateCronTime (setting: SchedulerSetting): CronTime {
    const { frequency, minute } = setting
    let time = ''
    if (frequency === ScheduleFrequency.MINUTELY) {
      time = `*/${minute} * * * *`
    } else {
      // To run every 5 minute
      time = '*/5 * * * *'
    }

    return new CronTime(time, 'Asia/Singapore')
  }
}