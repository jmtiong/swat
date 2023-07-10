import { Test, TestingModule } from "@nestjs/testing"
import { TRAFFIC_INFORMATION_SERVICE, TrafficInformationService } from "./traffic-information.interface"
import { TrafficInformationServiceImpl } from "./traffic-information.service"
import { DeepMocked, createMock } from '@golevelup/ts-jest'
import { AREA_SERVICE, AreaService } from "../area/area.interface"
import { CAMERA_SERVICE, CameraService } from "../camera/camera.interface"
import { TRAFFIC_CAPTURE_SERVICE, TrafficCaptureService } from "../traffic-capture/traffic-capture.interface"
import { BadRequestException } from "@nestjs/common"
import { Area, Prisma } from "@prisma/client"

describe('Traffic Information Service Test Suite', () => {

  describe('Retrieve list of cameras service', () => {
    let trafficService: TrafficInformationService
    let areaService: DeepMocked<AreaService>
    let cameraService: DeepMocked<CameraService>
    let trafficCaptureService: DeepMocked<TrafficCaptureService>

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: TRAFFIC_INFORMATION_SERVICE,
            useClass: TrafficInformationServiceImpl
          },
          {
            provide: AREA_SERVICE,
            useValue: createMock<AreaService>()
          },
          {
            provide: CAMERA_SERVICE,
            useValue: createMock<CameraService>()
          },
          {
            provide: TRAFFIC_CAPTURE_SERVICE,
            useValue: createMock<TrafficCaptureService>()
          },
          
        ]
      })
      .compile()

      trafficService = module.get<TrafficInformationService>(TRAFFIC_INFORMATION_SERVICE)
      areaService = module.get(AREA_SERVICE)
      cameraService = module.get(CAMERA_SERVICE)
      trafficCaptureService = module.get(TRAFFIC_CAPTURE_SERVICE)
    })

    it('If area is not provided, throw BadRequestException', async () => {
      areaService.retrieveArea.mockResolvedValueOnce(null)
      await expect(trafficService.retrieveListOfCamerasFromArea('testing')).rejects.toEqual(new BadRequestException('There is no such area testing to display.'))
    })

    it('If no cameras in area, return empty array', async () => {
      areaService.retrieveArea.mockResolvedValueOnce({} as Area)
      cameraService.retrieveListOfCamera.mockResolvedValueOnce([])
      await expect(trafficService.retrieveListOfCamerasFromArea('testing')).toEqual([])
    })

    it('If cameras in area, return array', async () => {
      areaService.retrieveArea.mockResolvedValueOnce({} as Area)
      cameraService.retrieveListOfCamera.mockResolvedValueOnce([
        {
          areaPky: 1,
          cameraId: '10',
          ctm: BigInt(Date.now()),
          utm: BigInt(Date.now()),
          lat: new Prisma.Decimal(1.0223),
          long: new Prisma.Decimal(103.2232),
          pky: 22
        }
      ])
      const result = await trafficService.retrieveListOfCamerasFromArea('testing')
      expect(result.length).toEqual(1)
      expect(result[0].cameraId).toEqual('10')
      expect(result[0].areaPky).toEqual(1)
      expect(result[0].pky).toEqual(22)
    })
  })
})