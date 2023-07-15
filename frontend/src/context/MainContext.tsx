import React, { useState } from "react"
import { AreaWithWeatherDto, CameraDto, TrafficCaptureDto, WeatherForecastDto } from "../services/openapi"
import { createContext } from "use-context-selector"

export type SwatModelType = {
  areaWeathers: AreaWithWeatherDto[]
  setAreaWeathers: React.Dispatch<React.SetStateAction<AreaWithWeatherDto[]>>
  weathers: WeatherForecastDto[]
  setWeathers: React.Dispatch<React.SetStateAction<WeatherForecastDto[]>>
  currentSelectedArea: AreaWithWeatherDto
  setCurrentSelectedArea: React.Dispatch<React.SetStateAction<AreaWithWeatherDto>>
  filteredAreas: AreaWithWeatherDto[]
  setFilteredAreas: React.Dispatch<React.SetStateAction<AreaWithWeatherDto[]>>
  cameras: CameraDto[]
  setCameras: React.Dispatch<React.SetStateAction<CameraDto[]>>
  currentCamera: CameraDto
  setCurrentCamera: React.Dispatch<React.SetStateAction<CameraDto>>
  trafficCapture: TrafficCaptureDto[]
  setTrafficCapture: React.Dispatch<React.SetStateAction<TrafficCaptureDto[]>>
  datetime: number | undefined
  setDatetime: React.Dispatch<React.SetStateAction<number | undefined>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SwatContext = createContext<SwatModelType>({} as SwatModelType)

export type WTContext = {
  children: React.ReactNode
};

const MainContext = ({children}: WTContext) => {
  const [areaWeathers, setAreaWeathers] = useState<AreaWithWeatherDto[]>([])
  const [weathers, setWeathers] = useState<WeatherForecastDto[]>([])
  const [cameras, setCameras] = useState<CameraDto[]>([])
  const [filteredAreas, setFilteredAreas] = useState<AreaWithWeatherDto[]>([])
  const [currentSelectedArea, setCurrentSelectedArea] = useState<AreaWithWeatherDto>({} as AreaWithWeatherDto)
  const [currentCamera, setCurrentCamera] = useState<CameraDto>({} as CameraDto)
  const [trafficCapture, setTrafficCapture] = useState<TrafficCaptureDto[]>([])
  const [datetime, setDatetime] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // const loadingReducer = (state: string[], value: string, action: 'ADD' | 'REMOVE') => {
  //   switch (action) {
  //     case 'ADD':
  //       if (!state.includes(value)) {
  //         state.push(value)
  //       }
  //       break
  //     case 'REMOVE':
  //       state = state.filter(loading => loading !== value)
  //   }
  //     return state
  // }
  return (
    <SwatContext.Provider value={{
      areaWeathers, setAreaWeathers,
      weathers, setWeathers,
      cameras, setCameras,
      filteredAreas, setFilteredAreas,
      currentSelectedArea, setCurrentSelectedArea,
      currentCamera, setCurrentCamera,
      trafficCapture, setTrafficCapture,
      datetime, setDatetime,
      isLoading, setIsLoading
    }}>
      { children }
    </SwatContext.Provider>
  );
}

export default MainContext;