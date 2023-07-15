import { Descriptions, Row, Timeline, TimelineItemProps } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";
import { useEffect, useState } from "react";

const WeatherDisplay = () => {
  const currentSelectedArea = useContextSelector(SwatContext, (state) => state.currentSelectedArea)

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
    const prepareWeatherTimeline: TimelineItemProps[] = currentSelectedArea.weatherForecast?.map(weather => {
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
  }, [currentSelectedArea])

  return (
    <>
      <Row>
        <Descriptions title={currentSelectedArea.name}>
        </Descriptions>
        {/* <Timeline mode="left" items={prepareWeatherTimeline}/> */}
        <Timeline
        mode="left"
        items={timeline}
      />
      </Row>
    </>
  )
}

export default WeatherDisplay;