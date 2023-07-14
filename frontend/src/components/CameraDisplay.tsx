import { Card, Space } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";

const CameraDisplay = () => {
  const cameras = useContextSelector(SwatContext, (state) => state.cameras)
  return (
    <>
      <Space size={4} wrap>
        {cameras.map(camera =>
          <Card key={camera.pky} size="small" title={`Camera ID: ${camera.cameraId}`}>
            <p>Latitude: {camera.lat}</p>
            <p>Longitude: {camera.long}</p>
          </Card>)}
      </Space>
    </>
  )
}

export default CameraDisplay;