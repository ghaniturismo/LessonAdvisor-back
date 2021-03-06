import { OnGet, Request, Route } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import { LessonPlace } from '../../../interfaces/lessonPlace';
import { LessonPlaceService } from '../../../services/lessonPlace';

@Route({
    path: '/api/lessonplaces/{id}',
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
                    numberOfPerson: Joi.number()
                 })
            }
        },
        description: 'Get one lessonplaces',
        notes: 'Returns one lessonplaces for the given id in path parameter',
        tags: ['api', 'lessonplaces']
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
