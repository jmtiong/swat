import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezonePlugin from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'

export class DatetimeService {
  constructor () {
    dayjs.extend(utc)
    dayjs.extend(timezonePlugin)
    dayjs.extend(duration)
  }

  convertTimestampToTimeZoneFormat (timestamp: bigint, timezone: string = 'Asia/Singapore') {
    return dayjs(Number(timestamp)).tz(timezone).format('YYYY-MM-DDTHH:mm:ssZ')
  }

  convertTimestampToDate (timestamp: bigint, timezone: string = 'Asia/Singapore') {
    return dayjs(Number(timestamp)).tz(timezone).format('YYYY-MM-DD')
  }
}