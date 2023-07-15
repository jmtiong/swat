import dayjs, { ManipulateType } from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezonePlugin from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DatetimeService {
  protected logger = new Logger(DatetimeService.name)

  constructor () {
    dayjs.extend(utc)
    dayjs.extend(timezonePlugin)
    dayjs.extend(duration)
  }

  getCurrentTimestamp (timezone: string = 'Asia/Singapore') {
    return dayjs().tz(timezone).valueOf()
  }

  resetTimestampToZeros (timestamp: number, timezone: string = 'Asia/Singapore') {
    return dayjs(timestamp)
      .tz(timezone)
      .set('millisecond', 0)
      .set('second', 0)
      .set('minute', 0)
      .set('hour', 0)
      .valueOf()
  }

  add (timestamp: number, unit: ManipulateType, value: number, timezone: string = 'Asia/Singapore') {
    return dayjs(timestamp).tz(timezone).add(value, unit).valueOf()
  }

  subtract (timestamp: number, unit: ManipulateType, value: number, timezone: string = 'Asia/Singapore') {
    return dayjs(timestamp).tz(timezone).subtract(value, unit).valueOf()
  }

  convertTimestampToTimeZoneFormat (timestamp: number, timezone: string = 'Asia/Singapore') {
    return dayjs(Number(timestamp)).tz(timezone).format('YYYY-MM-DDTHH:mm:ssZ')
  }

  convertTimestampToDate (timestamp: number, timezone: string = 'Asia/Singapore') {
    return dayjs(Number(timestamp)).tz(timezone).format('YYYY-MM-DD')
  }

  static convertDateToTimestamp (date: string, timezone: string = 'Asia/Singapore') {
    return dayjs(date).tz(timezone).valueOf()
  }
}