/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CameraDto } from '../models/CameraDto';
import type { TrafficCaptureDto } from '../models/TrafficCaptureDto';
import type { TrafficListRequestDto } from '../models/TrafficListRequestDto';
import type { TrafficRequestDto } from '../models/TrafficRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransportService {

    /**
     * @param requestBody
     * @returns TrafficCaptureDto
     * @throws ApiError
     */
    public static retrieveTrafficCapture(
        requestBody: TrafficRequestDto,
    ): CancelablePromise<TrafficCaptureDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transport/image',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns TrafficCaptureDto
     * @throws ApiError
     */
    public static retrieveListOfTrafficCaptures(
        requestBody: TrafficListRequestDto,
    ): CancelablePromise<Array<TrafficCaptureDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transport/images',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param area
     * @returns CameraDto
     * @throws ApiError
     */
    public static retrieveListOfCameras(
        area: string,
    ): CancelablePromise<Array<CameraDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transport/cameras',
            query: {
                'area': area,
            },
        });
    }

}
