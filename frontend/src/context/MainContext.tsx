import React, { useState } from "react"
import { AreaWithWeatherDto, CameraDto, TrafficCaptureDto } from "../services/openapi"
import { createContext } from "use-context-selector"

export type SwatModelType = {
  areaWeathers: AreaWithWeatherDto[]
  setAreaWeathers: React.Dispatch<React.SetStateAction<AreaWithWeatherDto[]>>
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
}

export const SwatContext = createContext<SwatModelType>({} as SwatModelType)

export type WTContext = {
  children: React.ReactNode
};

const MainContext = ({children}: WTContext) => {
  const [areaWeathers, setAreaWeathers] = useState<AreaWithWeatherDto[]>([])
  const [cameras, setCameras] = useState<CameraDto[]>([])
  const [filteredAreas, setFilteredAreas] = useState<AreaWithWeatherDto[]>([])
  const [currentSelectedArea, setCurrentSelectedArea] = useState<AreaWithWeatherDto>({} as AreaWithWeatherDto)
  const [currentCamera, setCurrentCamera] = useState<CameraDto>({} as CameraDto)
  const [trafficCapture, setTrafficCapture] = useState<TrafficCaptureDto[]>([])
  const [datetime, setDatetime] = useState<number | undefined>(undefined)

  return (
    <SwatContext.Provider value={{
      areaWeathers, setAreaWeathers,
      cameras, setCameras,
      filteredAreas, setFilteredAreas,
      currentSelectedArea, setCurrentSelectedArea,
      currentCamera, setCurrentCamera,
      trafficCapture, setTrafficCapture,
      datetime, setDatetime
    }}>
      { children }
    </SwatContext.Provider>
  );
}

export default MainContext;