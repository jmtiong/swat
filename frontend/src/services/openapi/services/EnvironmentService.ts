/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AreaWithWeatherDto } from '../models/AreaWithWeatherDto';
import type { WeatherForecastDto } from '../models/WeatherForecastDto';
import type { WeatherListRequestDto } from '../models/WeatherListRequestDto';
import type { WeatherRequestDto } from '../models/WeatherRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EnvironmentService {

    /**
     * @param requestBody
     * @returns AreaWithWeatherDto
     * @throws ApiError
     */
    public static retrieveListOfAreaWeatherForecast(
        requestBody: WeatherListRequestDto,
    ): CancelablePromise<Array<AreaWithWeatherDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/environment/2-hour-area-weather-forecast',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns WeatherForecastDto
     * @throws ApiError
     */
    public static retrieveAreaWeatherForecast(
        requestBody: WeatherRequestDto,
    ): CancelablePromise<Array<WeatherForecastDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/environment/2-hour-forecast',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
