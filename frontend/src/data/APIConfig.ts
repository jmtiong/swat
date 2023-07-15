import { OpenAPI } from "../services/openapi"

export class APIConfig {
  static configureOpenAPI () {
    const BASE_URL = 'http://localhost:3000'
    OpenAPI.BASE = BASE_URL
  }
}