import { TrafficRequestDto } from "@/dto/traffic-information.dto";
import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Query, Version } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { TRAFFIC_INFORMATION_SERVICE, TrafficInformationService } from "./traffic-information.interface";

@ApiTags('Transport')
@Controller('transport')
export class TrafficInformationController {

  constructor (
    @Inject(TRAFFIC_INFORMATION_SERVICE) protected readonly trafficInformationService: TrafficInformationService
  ) {}

  @Post('image')
  @ApiBody({ type: TrafficRequestDto })
  @Version('1')
  async retrieveTrafficCapture (@Body() requestDto: TrafficRequestDto) {
    return this.trafficInformationService.retrieveCameraTrafficCapture(requestDto)
  }

  @Get('cameras')
  async retrieveListOfCameras (@Query('area') area: string) {
    if (!area) {
      throw new BadRequestException('Area must be given.')
    }
    return this.trafficInformationService.retrieveListOfCamerasFromArea(area)
  }
}