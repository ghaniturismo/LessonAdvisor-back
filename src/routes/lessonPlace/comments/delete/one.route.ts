import { OnDelete, Request, Route } from '@hapiness/core';

import { LessonPlaceService } from '../../../../services/lessonPlace';

import { Observable } from 'rxjs/Observable';
import * as Joi from 'joi';

@Route({
    path: '/api/lessonPlace/{id}/comments/{commentId}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required(),
                commentId: Joi.string().required()
            }
        },
        description: 'Delete one comment',
        notes: 'Delete one comment for the given id in path parameter',
        tags: ['api', 'lessonPlace', 'comments']
    }
})
export class DeleteOneLessonPlaceCommentRoute implements OnDelete {
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
        return this._lessonPlaceService.deleteComment(request.params.id, request.params.commentId);
    }
}
