import { Global, Module } from "@nestjs/common";
import { DatetimeService } from "./date-time.service";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [ DatetimeService, PrismaService ],
  exports: [ DatetimeService, PrismaService ]
})
export class EssentialModule {}