import { OnGet, Request, Route } from '@hapiness/core';
import {UserService} from '../../../services/user';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import {User} from '../../../interfaces';


@Route({
    path: '/api/users',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        email: Joi.string().email().required(),
                        fullname: Joi.string().required(),
                        phone: Joi.string(),
                        city: Joi.string(),
                        avatar: Joi.string().uri(),
                        password: Joi.string()
                    })
                ).unique('id').min(1)
            }
        },
        description: 'Get all users',
        notes: 'Returns an array of users or 204',
        tags: ['api', 'users']
    }
})
export class GetAllUserRoute implements OnGet {
    /**
     * Class constructor
     * @param _user
     */
    constructor(private _user: UserService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<User[] | void> {
        return this._user.listAll();
    }
}
