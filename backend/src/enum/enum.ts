export enum ScheduleFrequency {
  MINUTELY = 0
}

export enum TaskType {
  GOV_SG_TRAFFIC_TASK = 'GOV_SG_TRAFFIC_TASK',
  GOV_SG_WEATHER_TASK = 'GOV_SG_WEATHER_TASK' 
}

export const convertToTaskType = (name: string) => {
  return TaskType[name]
}