import camelcaseKeysDeep from 'camelcase-keys-deep'
import { cloneDeep } from 'lodash'

export class GovSgCommonErrorResponse {
  code: number
  message: string
}

export class GovSgCommonSuccessResponse {
  apiInfo: GovSgApiInfo

  static convertAxiosResponseToDto (data: any) {
    const response = new GovSgCommonSuccessResponse()
    Object.assign(response, data)
    return response
  }
}

export class GovSgApiInfo {
  status: string
}

export class GovSgTrafficSuccessResponse extends GovSgCommonSuccessResponse {
  items: GovSgTrafficCapture[]

  static convertAxiosResponseToDto(data: any): GovSgTrafficSuccessResponse {
    const response = new GovSgTrafficSuccessResponse()
    const camelData = camelcaseKeysDeep(data)
    Object.assign(response, camelData)
    return response
  }
}

export class GovSgTrafficCapture {
  timestamp: string
  cameras: GovSgCameraInfo[]
}

export class GovSgCameraInfo {
  timestamp: string
  cameraId: string
  location: GovSgLabelLocation
  imageId: number
  image: string
  imageMetadata: GovSgImageMetadata
}

export class GovSgImageMetadata {
  height: number
  width: number
  md5: string
}

export class GovSgWeatherForecastSuccessResponse extends GovSgCommonSuccessResponse {
  areaMetadata: GovSgAreaMetadata[]
  items: GovSgWeatherInfo[]

  static convertAxiosResponseToDto(data: any): GovSgWeatherForecastSuccessResponse {
    const response = new GovSgWeatherForecastSuccessResponse()
    Object.assign(response, camelcaseKeysDeep(data))
    return response
  }
}

export class GovSgAreaMetadata {
  name: string
  labelLocation: GovSgLabelLocation
}

export class GovSgLabelLocation {
  longitude: number
  latitude: number
}

export class GovSgWeatherInfo {
  updateTimestamp: string
  timestamp: string
  validPeriod: GovSgValidPeriodInfo
  forecasts: GovSgForecast[]
}

export class GovSgValidPeriodInfo {
  start: string
  end: string
}

export class GovSgForecast {
  area: string
  forecast: string
}