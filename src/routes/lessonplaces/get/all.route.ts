import { OnGet, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../services/lessonPlace';
import { LessonPlace } from '../../../interfaces/lessonPlace';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';

@Route({
    path: '/api/lessonplaces',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name_teacher: Joi.string().required(),
                        email: Joi.string().email().allow(''),
                        phone: Joi.string().allow(''),
                        website: Joi.string().allow(''),
                        address: Joi.object().keys({
                            street: Joi.string().required(),
                            postalCode: Joi.number().required(),
                            city: Joi.string().required()
                        }).required(),
                        description: Joi.string(),
                        numberOfPerson: Joi.number()
                    })
                ).unique('id').min(1)
            }
        },
        description: 'Get all lessonplaces',
        notes: 'Returns an array of lessonplaces or 204',
        tags: ['api', 'lessonplaces']
    }
})
export class GetAllLessonPlaceRoute implements OnGet {
    /**
     * Class constructor
     * @param _lessonPlace
     */
    constructor(private _lessonPlace: LessonPlaceService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<LessonPlace[] | void> {
        return this._lessonPlace.listAll();
    }
}
