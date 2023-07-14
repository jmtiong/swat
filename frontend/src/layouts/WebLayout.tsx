import { Layout, Menu, theme } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Aperture from '../assets/aperture.svg'
import Sider from "antd/es/layout/Sider"
import { useEffect, useState } from "react"
import AreaDisplay from "../components/AreaDisplay"
import DateTimeToggle from "../components/DateTimeToggle"
import { getAreasWithWeather } from "../hooks/useAreasWithWeather"
import { useContextSelector } from "use-context-selector"
import { SwatContext } from "../context/MainContext"
import { EnvironmentService } from "../services/openapi"
import CameraDisplay from "../components/CameraDisplay"

const WebLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [datetime, setDatetime] = useState<number | undefined>(undefined)
  const setAreasWithWeather = useContextSelector(SwatContext, (state) => state.setAreaWeathers)
  const setFilteredAreas = useContextSelector(SwatContext, (state) => state.setFilteredAreas)
  useEffect(() => {
    (async () => {
      const areasWithWeathers = await EnvironmentService.retrieveListOfAreaWeatherForecast({
        datetime
      })
      setAreasWithWeather(areasWithWeathers)
      setFilteredAreas(areasWithWeathers)
      getAreasWithWeather(datetime)
    })()
  }, [])

  return (
    <Layout hasSider>
      <Sider width={300} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <DateTimeToggle></DateTimeToggle>
        <AreaDisplay></AreaDisplay>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', height:"60px"}}>
          <img src={Aperture}></img>
          <Menu theme="dark" mode="horizontal"></Menu>
        </Header>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, background: colorBgContainer }}>
            <CameraDisplay></CameraDisplay>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default WebLayout