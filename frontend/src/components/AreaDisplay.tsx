import { Avatar, Card, Select, Space } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";
import { AreaWithWeatherDto, TransportService } from "../services/openapi";
import { useGetAreaCameras } from "../hooks/useCameras";

const AreaDisplay = () => {
  const areas = useContextSelector(SwatContext, (state) => state.areaWeathers)
  const filteredAreas = useContextSelector(SwatContext, (state) => state.filteredAreas)
  const setFilteredAreas = useContextSelector(SwatContext, (state) => state.setFilteredAreas)
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

  const setCameras = useContextSelector(SwatContext, (state) => state.setCameras)
  const getCameras = async (area: AreaWithWeatherDto) => {
    console.log(area)
    const cameras = await TransportService.retrieveListOfCameras(area.name)
    setCameras(cameras)
  }

  return (
    <>
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
        {filteredAreas.map(area => <Card key={area.pky} size="small" onClick={e => getCameras(area)}>{area.name}</Card>)}
      </Space>
    </>
  )
}

export default AreaDisplay;