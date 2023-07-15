import { Descriptions, Row, Timeline, TimelineItemProps } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";
import { useEffect, useState } from "react";
import { AreaWithWeatherDto, EnvironmentService, WeatherForecastDto } from "../services/openapi";

const WeatherDisplay = () => {
  const currentSelectedArea = useContextSelector(SwatContext, (state) => state.currentSelectedArea)
  const setCurrentSelectedArea = useContextSelector(SwatContext, (state) => state.setCurrentSelectedArea)
  const weathers = useContextSelector(SwatContext, (state) => state.weathers)
  const setWeathers = useContextSelector(SwatContext, (state) => state.setWeathers)
  const datetime = useContextSelector(SwatContext, (state) => state.datetime)
  const { isLoading, setIsLoading, loadingReducer } = useContextSelector(SwatContext, ({ isLoading, setIsLoading, loadingReducer }) => { return { isLoading, setIsLoading, loadingReducer } })

  // @TODO: Refactor to a util class
  const formatDate = (from: number | undefined, to: number | undefined) => {
    if (!from || !to) {
      return 'No date is available.'
    }
    return`${new Date(from).toLocaleDateString()} ${new Date(from).toLocaleTimeString()} - ${new Date(to).toLocaleTimeString()}`
  }

  const weatherColourCode = (forecast: string) => {
    switch (forecast) {
      default: 
        return 'green'
    }
  }

  const [timeline, setTimeline] = useState<TimelineItemProps[] | undefined>(undefined)
  useEffect(() => {
    const generateTimeline = (weathers: WeatherForecastDto[]) => {
      const prepareWeatherTimeline: TimelineItemProps[] = weathers?.map(weather => {
        return {
          children: (
            <>
              <p>{formatDate(weather.validFrom, weather.validTo)}</p>
              <p>Weather Condition: {weather.forecast}</p>
            </>
          ),
          color: weatherColourCode(weather.forecast)
        }
      })
      setTimeline(prepareWeatherTimeline)
    }

    const retrieveAreaWeatherList = async () => {
      try {
        setIsLoading(loadingReducer(isLoading, 'WEATHER_DISPLAY', 'ADD'))
        const areas = await EnvironmentService.retrieveListOfAreaWeatherForecast({
          areas: [currentSelectedArea.name],
          datetime
        })
        const area = areas.find(area => area.pky === currentSelectedArea.pky)
        if (area) {
          setWeathers(area.weatherForecast)
          generateTimeline(area.weatherForecast)
        }
      } catch (error) {
      } finally {
        setIsLoading(loadingReducer(isLoading, 'WEATHER_DISPLAY', 'REMOVE'))
      }
    }

    retrieveAreaWeatherList()
  }, [currentSelectedArea, datetime])

  return (
    <>
      <Row>
        <Descriptions title={currentSelectedArea.name}>
        </Descriptions>
        <Timeline
        mode="left"
        items={timeline}
      />
      </Row>
    </>
  )
}

export default WeatherDisplay;