import { Card, Select, Space } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";
import { AreaWithWeatherDto, TransportService } from "../services/openapi";
import MediaQuery from "react-responsive";

const AreaDisplay = () => {
  const areas = useContextSelector(SwatContext, (state) => state.areaWeathers)
  const filteredAreas = useContextSelector(SwatContext, (state) => state.filteredAreas)
  const setFilteredAreas = useContextSelector(SwatContext, (state) => state.setFilteredAreas)
  const setCurrentSelectedArea = useContextSelector(SwatContext, (state) => state.setCurrentSelectedArea)
  const { isLoading, setIsLoading, loadingReducer } = useContextSelector(SwatContext, ({ isLoading, setIsLoading, loadingReducer }) => { return { isLoading, setIsLoading, loadingReducer } })

  const options = areas.map(({ pky, name }) => {
    return {
      value: pky,
      label: name
    }
  })

  const filterAreaChange = (value: number[]) => {
    if (value.length === 0) {
      setFilteredAreas(areas)
      return
    }
    setFilteredAreas(areas.filter(area => value.includes(area.pky)))
  }

  const mobileSelect = (value: number) => {
    const area = areas.find(area => value === area.pky)
    if (area) {
      setCurrentSelectedArea(area)
      getCameras(area)
    }
  }

  const setCameras = useContextSelector(SwatContext, (state) => state.setCameras)
  const getCameras = async (area: AreaWithWeatherDto) => {
    try {
      setIsLoading(loadingReducer(isLoading, 'AREA_DISPLAY', 'ADD'))
      setCurrentSelectedArea(area)
      const cameras = await TransportService.retrieveListOfCameras(area.name)
      setCameras(cameras)
    } catch (error) {
    } finally {
      setIsLoading(loadingReducer(isLoading, 'AREA_DISPLAY', 'REMOVE'))
    }
  }

  return (
    <>
    <MediaQuery minWidth={1000}>
      <Select
        showSearch
        mode="multiple"
        size="middle"
        placeholder="Type and filter areas!"
        style={{ width: '100%', padding: '10px 10px' }}
        options={options}
        optionFilterProp="children"
        onChange={filterAreaChange}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
      ></Select>
      <Space size={4} wrap>
        {filteredAreas.map(area => <Card key={area.pky} size="small" onClick={e => getCameras(area)} hoverable={true}>{area.name}</Card>)}
      </Space>
    </MediaQuery>
    <MediaQuery maxWidth={999}>
      <Select
        showSearch
        size="middle"
        placeholder="Search and select an area!"
        style={{ width: '100%', padding: '10px 10px' }}
        options={options}
        optionFilterProp="children"
        onChange={mobileSelect}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
      ></Select>
    </MediaQuery>
    </>
  )
}

export default AreaDisplay;