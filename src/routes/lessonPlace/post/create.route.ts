import { Observable } from 'rxjs/Observable';
import { OnPost, Request, Route } from '@hapiness/core';
import { LessonPlaceService } from '../../../services/lessonPlace';
import * as Joi from 'joi';
import {HTTPHandlerResponse} from '@hapiness/core/extensions/http-server';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@hapiness/logger';

@Route({
    path: '/api/lessonPlace',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                name_teacher: Joi.string().required(),
                email: Joi.string().email(),
                phone: Joi.string(),
                website: Joi.string(),
                address: Joi.object().keys({
                    street: Joi.string().required(),
                    postalCode: Joi.number().required(),
                    city: Joi.string().required()
                }).required(),
                description: Joi.string(),
                numberOfPerson: Joi.number()
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    name_teacher: Joi.string().required(),
                    email: Joi.string().email(),
                    phone: Joi.string(),
                    website: Joi.string(),
                    address: Joi.object().keys({
                        street: Joi.string().required(),
                        postalCode: Joi.number().required(),
                        city: Joi.string().required()
                    }).required(),
                    description: Joi.string(),
                    numberOfPerson: Joi.number(),
                })
            }
        },
        description: 'Create one lessonPlace',
        notes: 'Create a new lessonPlace and return it',
        tags: ['api', 'lessonPlace']
    }
})
export class PostCreateLessonPlaceRoute implements OnPost {
    /**
     * Class constructor
     * @param _lessonPlaceService
     * @param _logger
     */
    constructor(private _lessonPlaceService: LessonPlaceService, private _logger: LoggerService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._lessonPlaceService.create(request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
