import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpClientService } from "./http-client.service";
import { DatetimeService } from "./date-time.service";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useExisting: HttpClientService
    })
  ],
  exports: [
    HttpClientService, DatetimeService, PrismaService
  ]
})
export class EssentialModule {}