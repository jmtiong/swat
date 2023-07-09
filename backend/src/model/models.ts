import { GovSgAreaMetadata, GovSgCameraInfo, GovSgForecast, GovSgWeatherInfo } from '@/dto/gov-sg.dto'
import { DatetimeService } from '@/util/date-time.service'
import { TrafficCapture, Area, Prisma, Camera, WeatherForecast } from '@prisma/client'

export class LatLong {
  lat: number
  long: number
}

export class AreaModel {
  pky: number
  ctm: bigint
  utm: bigint
  name: string
  lat: number
  long: number
  // cameras: CameraModel[]
  // weatherForecast: WeatherForecastModel[]

  sanitizeToDatabaseFormat (): Partial<Area> {
    const { pky, ctm, utm, ...others } = this
    const lat = new Prisma.Decimal(this.lat)
    const long = new Prisma.Decimal(this.long)
    return {
      ...others,
      lat,
      long
    }
  }

  populateFromGovSgData (metadata: GovSgAreaMetadata) {
    this.name = metadata.name
    const { latitude, longitude } = metadata.labelLocation
    this.lat = latitude
    this.long = longitude
    return this
  }
}

export class CameraModel {
  pky: number
  ctm: bigint
  utm: bigint
  cameraId: string
  lat: number
  long: number
  areaPky: number
  // area: Area
  // captures: TrafficCapture[]

  sanitizeToDatabaseFormat (): Partial<Camera> {
    const { pky, ctm, utm, lat, long, ...others } = this
    const latDecimal = new Prisma.Decimal(this.lat)
    const longDecimal = new Prisma.Decimal(this.long)
    return {
      ...others,
      lat: latDecimal,
      long: longDecimal
    }
  }

  populateFromGovSgData (data: GovSgCameraInfo) {
    this.cameraId = data.cameraId
    const { latitude, longitude } = data.location
    this.lat = latitude
    this.long = longitude
    return this
  }

  populateArea (area: Area) {
    this.areaPky = area.pky
    return this
  }
}

export class WeatherForecastModel {
  pky: number
  ctm: bigint
  utm: bigint
  forecast: string
  lastUpdateTimestamp: string
  validFrom: string
  validTo: string
  isArchived: boolean
  areaPky: number

  sanitizeToDatabaseFormat (): Partial<WeatherForecast> {
    const { pky, ctm, utm, ...others } = this
    const validFrom = DatetimeService.convertDateToTimestamp(others.validFrom)
    const validTo = DatetimeService.convertDateToTimestamp(others.validTo)
    const lastUpdateTimestamp = DatetimeService.convertDateToTimestamp(others.lastUpdateTimestamp)
    return {
      ...others,
      validFrom,
      validTo,
      lastUpdateTimestamp
    }
  }

  populateFromGovSgData (weatherInfo: GovSgWeatherInfo, data: GovSgForecast, area: Area) {
    this.forecast = data.forecast
    const { start, end } = weatherInfo.validPeriod
    this.validFrom = start
    this.validTo = end
    this.areaPky = area?.pky
    this.lastUpdateTimestamp = weatherInfo.updateTimestamp
    return this
  }
}

export class TrafficCaptureModel {
  pky: number
  ctm: bigint
  utm: bigint
  url: string
  hash: string
  width: number
  height: number
  isArchived: boolean
  capturedTimestamp: string
  cameraPky: number
  // camera: Camera

  sanitizeToDatabaseFormat (): Partial<TrafficCapture> {
    const { pky, ctm, utm, ...others } = this
    const timestamp = DatetimeService.convertDateToTimestamp(others.capturedTimestamp)
    return {
      ...others,
      capturedTimestamp: timestamp
    }
  }

  populateFromGovSgData (data: GovSgCameraInfo, camera?: Camera) {
    this.capturedTimestamp = data.timestamp
    const { height, width, md5 } = data.imageMetadata
    this.height = height
    this.width = width
    this.hash = md5
    this.url = data.image
    this.cameraPky = camera?.pky
    return this
  }
}