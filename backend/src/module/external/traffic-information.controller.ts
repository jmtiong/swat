import { TrafficRequestDto } from "@/dto/traffic-information.dto";
import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Query, Version } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TRAFFIC_INFORMATION_SERVICE, TrafficInformationService } from "./traffic-information.interface";
import { CameraModel, TrafficCaptureModel } from "@/model/models";
import { CameraDto, TrafficCaptureDto } from "@/dto/camera.dto";

@ApiTags('Transport')
@Controller('transport')
export class TrafficInformationController {

  constructor (
    @Inject(TRAFFIC_INFORMATION_SERVICE) protected readonly trafficInformationService: TrafficInformationService
  ) {}

  @Post('image')
  @ApiBody({ type: TrafficRequestDto })
  @ApiOkResponse({ type: TrafficCaptureDto })
  @Version('1')
  async retrieveTrafficCapture (@Body() requestDto: TrafficRequestDto) {
    return this.trafficInformationService.retrieveCameraTrafficCapture(requestDto)
  }

  @Get('cameras')
  @ApiOkResponse({ type: CameraDto, isArray: true })
  @Version('1')
  async retrieveListOfCameras (@Query('area') area: string) {
    if (!area) {
      throw new BadRequestException('Area must be given.')
    }
    return this.trafficInformationService.retrieveListOfCamerasFromArea(area)
  }
}