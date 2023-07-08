import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpClientService implements HttpModuleOptionsFactory {
  constructor () {}

  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      timeout: 5000,
      maxRedirects: 5,
    }
  }
}