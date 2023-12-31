import { Inject, Injectable, Logger } from "@nestjs/common";
import { ScheduleTask } from "./schedule-task.interface";
import { CronTime, CronJob } from "cron";
import { GovSgTrafficService } from "@/integration/gov-sg-traffic.service";
import { SchedulerSetting, TrafficCapture } from "@prisma/client";
import { DatetimeService } from "@/util/date-time.service";
import { TRAFFIC_CAPTURE_SERVICE, TrafficCaptureService } from "@/module/traffic-capture/traffic-capture.interface";
import { CAMERA_SERVICE, CameraService } from "@/module/camera/camera.interface";
import { AREA_SERVICE, AreaService } from "@/module/area/area.interface";
import { TrafficCaptureModel } from "@/model/models";
import { GovSgTrafficCapture } from "@/dto/gov-sg.dto";

export const GOV_SG_TRAFFIC_TASK = 'GovSgTrafficTask'

@Injectable()
export class GovSgTrafficTask implements ScheduleTask {
  protected logger = new Logger(GovSgTrafficTask.name)
  protected jobSetting: SchedulerSetting = null
  protected cronJob: CronJob = null

  constructor (
    protected readonly govSgTrafficService: GovSgTrafficService,
    protected readonly datetimeService: DatetimeService,
    @Inject(TRAFFIC_CAPTURE_SERVICE) protected readonly trafficCaptureService: TrafficCaptureService,
    @Inject(CAMERA_SERVICE) protected readonly cameraService: CameraService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService
  ) {}

  setupSettings(jobSetting: SchedulerSetting) {
    this.jobSetting = jobSetting
  }

  initiateJob(frequency: CronTime): CronJob {
    this.cronJob = new CronJob(frequency.sendAt(), async () => {
      this.logger.log('Executing Gov SG Traffic API...')
      const currentTime = this.datetimeService.getCurrentTimestamp()
      this.executeTask(currentTime)
    })

    return this.cronJob
  }
  async executeTask(datetime: number) {
    let trafficCaptures: GovSgTrafficCapture = null
    try {
      const govResponse = await this.govSgTrafficService.retrieveTransportTrafficImages(datetime)
      trafficCaptures = govResponse.items[0]
    } catch (error) {
      this.logger.error('Unable to retrieve data from Gov SG.')
      this.logger.error(error)
    }

    if (!trafficCaptures) {
      this.logger.log('No captures to go through')
      return
    }

    return Promise.all(trafficCaptures.cameras.map(async (cameraCapture) => {
      const { cameraId, imageMetadata } = cameraCapture
      const { md5 } = imageMetadata 
      const storedCapture = await this.trafficCaptureService.retrieveLastTrafficCaptureFromId(cameraCapture.cameraId, datetime)
      const camera = await this.cameraService.retrieveCameraFromId(cameraId)

      if (!storedCapture || storedCapture.hash !== md5) {
        this.logger.log(`Generating new capture for pky: ${camera.pky}, camera id: ${camera.cameraId}.`)
        const newCapture = new TrafficCaptureModel()
        newCapture.populateFromGovSgData(cameraCapture, camera)
        return this.trafficCaptureService.createTrafficCapture(newCapture.sanitizeToDatabaseFormat() as TrafficCapture)
      }

      if (storedCapture.isArchived) {
        this.logger.log(`Already archived capture for pky: ${camera.pky}, camera id: ${camera.cameraId}.`)
        return
      }
      
      // storedCapture hash is the same, archive it.
      this.logger.log(`Archiving camera capture for pky: ${camera.pky}, camera id: ${camera.cameraId}.`)
      const existingCapture = new TrafficCaptureModel()
      existingCapture.populateFromGovSgData(cameraCapture, camera)
      existingCapture.isArchived = true
      return this.trafficCaptureService.updateTrafficCapture(storedCapture.pky, existingCapture.sanitizeToDatabaseFormat() as TrafficCapture)
    }))
  }

}