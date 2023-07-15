import { Col, Layout, Row, Spin, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect } from "react"
import AreaDisplay from "../components/AreaDisplay"
import DateTimeToggle from "../components/DateTimeToggle"
import { useContextSelector } from "use-context-selector"
import { SwatContext } from "../context/MainContext"
import { EnvironmentService } from "../services/openapi"
import CameraDisplay from "../components/CameraDisplay"
import WeatherDisplay from "../components/WeatherDisplay"

const WebLayout = () => {
  const setAreasWithWeather = useContextSelector(SwatContext, (state) => state.setAreaWeathers)
  const setFilteredAreas = useContextSelector(SwatContext, (state) => state.setFilteredAreas)
  const datetime = useContextSelector(SwatContext, (state) => state.datetime)
  const { isLoading, setIsLoading } = useContextSelector(SwatContext, ({ isLoading, setIsLoading }) => { return { isLoading, setIsLoading } })
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const areasWithWeathers = await EnvironmentService.retrieveListOfAreaWeatherForecast({
          datetime
        })
        setAreasWithWeather(areasWithWeathers)
        setFilteredAreas(areasWithWeathers)
        console.log(isLoading)
      } catch (error) {
      } finally {
        console.log('is even running?')
        setIsLoading(false)
        console.log(isLoading)
      }

    })()
  }, [datetime])

  return (
    <Spin spinning={isLoading}>
      <Layout hasSider>
        <Content style={{ height: '100vh'}}>
          <Layout>
            <Content>
              <>
                <Row>
                  <Col span={18}>
                    <DateTimeToggle></DateTimeToggle>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <AreaDisplay></AreaDisplay>
                  </Col>
                  <Col span={6}>
                    <WeatherDisplay></WeatherDisplay>
                  </Col>
                </Row>
              </>
            </Content>
          </Layout>
          <Layout>
            <Content>
              <CameraDisplay></CameraDisplay>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Spin>
  )
}

export default WebLayout