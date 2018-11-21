import { OnPut, Request, Route } from '@hapiness/core';

import { UserService} from '../../../services';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import {User} from '../../../interfaces';

@Route({
    path: '/api/users/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                email: Joi.string().email().required(),
                fullname: Joi.string().required(),
                phone: Joi.string(),
                city: Joi.string(),
                avatar: Joi.string().uri(),
                password: Joi.string()
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
                    email: Joi.string().email().required(),
                    fullname: Joi.string().required(),
                    phone: Joi.string(),
                    city: Joi.string(),
                    avatar: Joi.string().uri(),
                    password: Joi.string()
                })
            }
        },
        description: 'Update one user',
        notes: 'Update the user for the given id in path parameter and return it',
        tags: ['api', 'users']
    }
})
export class PutUpdateUserPlaceRoute implements OnPut {
    /**
     * Class constructor
     * @param _userService
     */
    constructor(private _userService: UserService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<User> {
        return this._userService.update(request.params.id, request.payload);
    }
}
