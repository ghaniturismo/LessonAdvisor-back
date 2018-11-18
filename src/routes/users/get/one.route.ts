import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user/user.service';

import * as Joi from 'joi';


@Route({
    path: '/api/users/{id}',
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
                    email: Joi.string().email().required(),
                    fullname: Joi.string().required(),
                    phone: Joi.string(),
                    city: Joi.string(),
                    avatar: Joi.string().uri(),
                    password: Joi.string().allow('').max(0)
                })
            }
        },
        description: 'Get one user',
        notes: 'Returns one user for the given id in path parameter',
        tags: ['api', 'users']
    }
})
export class GetOneUserRoute implements OnGet {
    /**
     * Class constructor
     * @param _userService
     */
    constructor(private _userService: UserService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<User> {
        return this._userService.one(request.params.id);
    }
}
