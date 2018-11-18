import { OnPut, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../services';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import {LessonPlace} from '../../../interfaces/lessonPlace';

@Route({
    path: '/api/lessonPlace/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name_teacher: Joi.string().required(),
                email: Joi.string().email().required(),
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
                200: Joi.object().keys({
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
                    comments: Joi.array().items(Joi.object().keys({
                        id: Joi.string(),
                        user: Joi.any().required(),
                        rating: Joi.number().required(),
                        text: Joi.string().required()
                    }))
                })
            }
        },
        description: 'Update one lessonPlace',
        notes: 'Update the lessonPlace for the given id in path parameter and return it',
        tags: ['api', 'lessonPlace']
    }
})
export class PutUpdateLessonPlaceRoute implements OnPut {
    /**
     * Class constructor
     * @param _lessonPlaceService
     */
    constructor(private _lessonPlaceService: LessonPlaceService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<LessonPlace> {
        return this._lessonPlaceService.update(request.params.id, request.payload);
    }
}
