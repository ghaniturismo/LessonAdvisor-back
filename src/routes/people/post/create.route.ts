import { OnPost, Route, Request, HTTPHandlerResponse} from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { PeopleService } from '../../../services'
import * as Joi from 'joi';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@hapiness/logger';

@Route({
    path: '/api/people',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                photo: Joi.string(),
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required(),
                address: Joi.object().keys({
                    street: Joi.string().required(),
                    postalCode: Joi.number().required(),
                    city: Joi.string().required()
                }).required()
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
                    photo: Joi.string(),
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required(),
                    email: Joi.string().email().required(),
                    phone: Joi.string().required(),
                    address: Joi.object().keys({
                        street: Joi.string().required(),
                        postalCode: Joi.number().required(),
                        city: Joi.string().required()
                    }).required()
                })
            }
        },
        description: 'Create one people',
        notes: 'Create a new people and return it',
        tags: ['api', 'people']
    }
})
export class PostCreatePeopleRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     * @param _logger
     */
    constructor(private _peopleService: PeopleService, private _logger: LoggerService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._peopleService.create(request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
