export enum ScheduleFrequency {
  MINUTELY = 0
}

export enum WeatherCastType {
  TWO_HOUR = 'TWO_HOUR'
}

export enum TaskType {
  GOV_SG_TRAFFIC_TASK = 'GOV_SG_TRAFFIC_TASK',
  GOV_SG_WEATHER_TASK = 'GOV_SG_WEATHER_TASK' 
}

export const convertToTaskType = (name: string) => {
  return TaskType[name]
}

export enum ApiName {
  GOV_SG_TWO_HOUR_WEATHER_URL = 'GOV_SG_TWO_HOUR_WEATHER_URL',
  GOV_SG_TRAFFIC_URL = 'GOV_SG_TRAFFIC_URL'
}