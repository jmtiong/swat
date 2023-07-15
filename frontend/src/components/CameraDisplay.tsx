import { Card, Col, Descriptions, Row, Space } from "antd";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";
import { useEffect } from "react";
import { CameraDto, TransportService } from "../services/openapi";
const { Meta } = Card;

const CameraDisplay = () => {
  const cameras = useContextSelector(SwatContext, (state) => state.cameras)
  const trafficCaptures = useContextSelector(SwatContext, (state) => state.trafficCapture)
  const setTrafficCapture = useContextSelector(SwatContext, (state) => state.setTrafficCapture)
  const datetime = useContextSelector(SwatContext, (state) => state.datetime)
  const { isLoading, setIsLoading } = useContextSelector(SwatContext, ({ isLoading, setIsLoading }) => { return { isLoading, setIsLoading } })

  useEffect(() => {
    const getCaptures = async () => {
      try {
        setIsLoading(true)
        const trafficCaptures = await TransportService.retrieveListOfTrafficCaptures({
          cameraIds: cameras.map(camera => camera.cameraId),
          datetime
        })
  
        setTrafficCapture(trafficCaptures)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    getCaptures()
  }, [cameras, datetime])

  const retrieveCapture = (camera: CameraDto) => {
    const capture = trafficCaptures.find(capture => capture.cameraPky === camera.pky)
    return capture
  }

  // @TODO: Refactor to a util class
  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) {
      return 'No date is captured.'
    }
    return`${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()}`
  }

  if (cameras.length === 0) {
    return (
      <>
        <Space style={{ padding: '10px'}}>
          <Descriptions>
            <Descriptions.Item>
              There are no cameras to display.
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </>
    )
  }

  return (
    <>
    <Row style={{ padding: '10px' }}>
      <Col span={2}></Col>
      <Col span={20}>
        <Space wrap>
          {cameras.map(camera =>
            <Card
              key={camera.pky}
              size="small"
              style={{ width: '480px' }}
              cover={<img alt='Traffic Capture' src={retrieveCapture(camera)?.url}></img>}
            >
              <Meta 
                title={`Camera ID: ${camera.cameraId}`}
                description={`Captured Timestamp: ${formatDate(retrieveCapture(camera)?.capturedTimestamp)}`}
              ></Meta>
            </Card>
          )}
        </Space >
      </Col>
      <Col span={2}></Col>
    </Row>
    </>
  )
}

export default CameraDisplay;