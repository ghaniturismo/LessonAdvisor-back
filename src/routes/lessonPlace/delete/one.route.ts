import { OnDelete, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../services/lessonPlace';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';

@Route({
    path: '/api/lessonPlace/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete one lessonPlace',
        notes: 'Delete one lessonPlace for the given id in path parameter',
        tags: ['api', 'lessonPlace']
    }
})
export class DeleteOneLessonPlaceRoute implements OnDelete {
    /**
     * Class constructor
     * @param _lessonPlaceService
     */
    constructor(private _lessonPlaceService: LessonPlaceService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._lessonPlaceService.delete(request.params.id);
    }
}
