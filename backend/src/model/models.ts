import { TrafficCapture, Area, Prisma, Camera } from '@prisma/client'

export class AreaModel {
  pky: number
  ctm: bigint
  utm: bigint
  name: string
  lat: number
  long: number
  // cameras: CameraModel[]
  // weatherForecast: WeatherForecastModel[]

  sanitizeFromDatabase () {
    
  }
}

export class CameraModel {
  pky: number
  ctm: bigint
  utm: bigint
  cameraId: string
  name: string
  lat: number
  long: number
  // area: Area
  // captures: TrafficCapture[]

  static sanitizeFromDatabase () {
    
  }
}

export class WeatherForecastModel {
  pky: number
  ctm: bigint
  utm: bigint
  forecast: string
  validFrom: bigint
  validTo: bigint
  isArchived: boolean
  // area: Area

  sanitizeFromDatabase () {
    
  }
}

const trafficCaptureWithCamera = Prisma.validator<Prisma.TrafficCaptureArgs>()({
  include: { camera: true }
})

export class TrafficCaptureModel {
  pky: number
  ctm: bigint
  utm: bigint
  url: string
  hash: string
  width: string
  height: string
  isArchived: boolean
  capturedTimestamp: bigint
  // camera: Camera

  static sanitizeFromDatabase (trafficCapture: Prisma.TrafficCaptureGetPayload<typeof trafficCaptureWithCamera>) {
    const capture = new TrafficCaptureModel()
    Object.assign(capture, trafficCapture)
    return capture
  }
}