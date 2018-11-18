import { Observable } from 'rxjs/Observable';
import { OnPost, Request, Route } from '@hapiness/core';
import * as Joi from 'joi';
import { Comment } from '../../../../interfaces/lessonPlace';
import {HTTPHandlerResponse} from '@hapiness/core/extensions/http-server';
import {tap} from 'rxjs/operators';
import {LessonPlaceService} from '../../../../services/lessonPlace';
import {LoggerService} from '@hapiness/logger';

@Route({
    path: '/api/lessonPlace/{id}/comments',
    method: 'POST',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                user: Joi.string().required(),
                rating: Joi.number().required(),
                text: Joi.string().required()
            }).required()
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
                    numberOfPerson: Joi.number(),
                    comments: Joi.array().items(Joi.object().keys({
                        id: Joi.string(),
                        user: Joi.any(),
                        rating: Joi.number().required(),
                        text: Joi.string().required()
                    }))
                })
            }
        },
        description: 'Create a comment and return the nursery',
        notes: 'Create one comment for a nursery identified by id passed as parameter',
        tags: ['api', 'lessonPlace', 'comments']
    }
})
export class PostCreateLessonPlaceCommentRoute implements OnPost {
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
        return this._lessonPlaceService.createComment(request.params.id, request.payload as Comment).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
