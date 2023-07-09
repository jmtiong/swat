import { GovSgWeatherService } from "@/integration/gov-sg-weather.service";
import { AreaModel } from "@/model/models";
import { AREA_SERVICE, AreaService } from "@/module/area/area.interface";
import { PrismaService } from "@/util/prisma.service";
import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Area } from "@prisma/client";

@Injectable()
export class AreaInitializationService implements OnApplicationBootstrap {
  protected logger = new Logger(AreaInitializationService.name)
  constructor (
    protected readonly govSgWeatherService: GovSgWeatherService,
    @Inject(AREA_SERVICE) protected readonly areaService: AreaService
  ) {}
  async onApplicationBootstrap() {
    const areas = await this.areaService.countNumberOfAreas()

    if (areas !== 0) { return }

    const response = await this.govSgWeatherService.retrieveTwoHourForecasts()
    const areaMetadatas = response.areaMetadata

    const areasToCreate = areaMetadatas.map(metadata => {
      const area = new AreaModel()
      return area.populateFromGovSgData(metadata)
    })

    const createdAreas = await this.areaService.createManyAreas(areasToCreate.map(area => area.sanitizeToDatabaseFormat() as Area))

    this.logger.log(`A total of ${createdAreas} areas were created.`)
  }
}