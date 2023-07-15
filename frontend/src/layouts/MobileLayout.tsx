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

const MobileLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      } catch (error) {
      } finally {
        setIsLoading(false)
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
                  <Col span={24}>
                    <DateTimeToggle></DateTimeToggle>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <AreaDisplay></AreaDisplay>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
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

export default MobileLayout