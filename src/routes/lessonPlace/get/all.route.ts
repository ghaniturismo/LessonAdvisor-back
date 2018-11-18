import { OnGet, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../services/lessonPlace';
import { LessonPlace } from '../../../interfaces/lessonPlace';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';

@Route({
    path: '/api/lessonPlace',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        email: Joi.string().email(),
                        phone: Joi.string(),
                        website: Joi.string(),
                        address: Joi.object().keys({
                            street: Joi.string().required(),
                            postalCode: Joi.number().required(),
                            city: Joi.string().required()
                        }).required(),
                        description: Joi.string(),
                        staffNumber: Joi.number(),
                        comments: Joi.array()

                    })
                ).unique('id').min(1)
            }
        },
        description: 'Get all lessonPlace',
        notes: 'Returns an array of lessonPlace or 204',
        tags: ['api', 'lessonPlace']
    }
})
export class GetAllLessonPlaceRoute implements OnGet {
    /**
     * Class constructor
     * @param _nurseryService
     */
    constructor(private _nurseryService: LessonPlaceService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<LessonPlace[] | void> {
        return this._nurseryService.listAll();
    }
}
