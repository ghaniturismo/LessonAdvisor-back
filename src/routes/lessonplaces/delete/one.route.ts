import { OnDelete, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../services/lessonPlace';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';

@Route({
    path: '/api/lessonplaces/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete one lessonplaces',
        notes: 'Delete one lessonplaces for the given id in path parameter',
        tags: ['api', 'lessonplaces']
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
