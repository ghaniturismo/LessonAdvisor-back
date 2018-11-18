import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import { LessonPlaceDocumentService } from '../lessonPlace-document';

import { AbstractService } from '../abstract';
import { Comment, LessonPlace} from '../../interfaces/lessonPlace';
import {catchError, flatMap, map} from 'rxjs/operators';
import {_throw} from 'rxjs-compat/observable/throw';
import {Biim} from '@hapiness/biim';
import {Observable, of} from 'rxjs';

@Injectable()
export class LessonPlaceService extends AbstractService<LessonPlace> {
    /**
     * Class constructor
     */
    constructor(private _lessonPlaceDocumentService: LessonPlaceDocumentService) {
        super(_lessonPlaceDocumentService, 'LessonPlace');
    }


    createComment(id: string, comment: Comment): Observable<HTTPHandlerResponse> {
        return this._lessonPlaceDocumentService.createComment(id, comment)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }
    deleteComment(id: string, commentId: string): Observable<void> {
        return this._lessonPlaceDocumentService.removeCommentById(id, commentId)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`lessonPlace with id '${id}' not found`))
                )
            );
    }
}
