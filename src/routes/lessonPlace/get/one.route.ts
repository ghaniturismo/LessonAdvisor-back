import { OnGet, Request, Route } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import { LessonPlace } from '../../../interfaces/lessonPlace';
import { LessonPlaceService } from '../../../services/lessonPlace';

@Route({
    path: '/api/lessonPlace/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
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
                        id: Joi.any(),
                        user: Joi.object().keys({
                            id: Joi.string().required(),
                            fullname: Joi.string().required(),
                        }).required(),
                        rating: Joi.number().required(),
                        text: Joi.string().required()
                    }))
                })
            }
        },
        description: 'Get one lessonPlace',
        notes: 'Returns one lessonPlace for the given id in path parameter',
        tags: ['api', 'lessonPlace']
    }
})
export class GetOneLessonPlaceRoute implements OnGet {
    /**
     * Class constructor
     * @param _lessonPlaceService
     */
    constructor(private _lessonPlaceService: LessonPlaceService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<LessonPlace> {
        return this._lessonPlaceService.one(request.params.id);
    }
}
