import { OnDelete, Request, Route } from '@hapiness/core';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';
import {UserService} from '../../../services/user';

@Route({
    path: '/api/users/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete one user',
        notes: 'Delete one users for the given id in path parameter',
        tags: ['api', 'users']
    }
})
export class DeleteOneUserRoute implements OnDelete {
    /**
     * Class constructor
     * @param _userService
     */
    constructor(private _userService: UserService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._userService.delete(request.params.id);
    }
}
