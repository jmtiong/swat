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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setAreasWithWeather = useContextSelector(SwatContext, (state) => state.setAreaWeathers)
  const setFilteredAreas = useContextSelector(SwatContext, (state) => state.setFilteredAreas)
  const datetime = useContextSelector(SwatContext, (state) => state.datetime)
  const { isLoading, setIsLoading, loadingReducer } = useContextSelector(SwatContext, ({ isLoading, setIsLoading, loadingReducer }) => { return { isLoading, setIsLoading, loadingReducer } })
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(loadingReducer(isLoading, 'WEB_LAYOUT', 'ADD'))
        const areasWithWeathers = await EnvironmentService.retrieveListOfAreaWeatherForecast({
          datetime
        })
        setAreasWithWeather(areasWithWeathers)
        setFilteredAreas(areasWithWeathers)
      } catch (error) {
      } finally {
        setIsLoading(loadingReducer(isLoading, 'WEB_LAYOUT', 'REMOVE'))
      }

    })()
  }, [datetime])

  return (
    <Spin spinning={isLoading.length > 0}>
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