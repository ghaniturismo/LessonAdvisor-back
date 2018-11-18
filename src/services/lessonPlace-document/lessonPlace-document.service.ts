import { Config } from '@hapiness/config';
import { MongoClientService } from '@hapiness/mongo';

import { LessonPlaceModel } from '../../models/lessonPlace';
import { Comment, LessonPlace } from '../../interfaces/lessonPlace';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MongooseDocument } from 'mongoose';
import { of } from 'rxjs/observable/of';
import { AbstractDocumentService } from '../abstract-document';
import {Injectable} from '@hapiness/core';


@Injectable()
export class LessonPlaceDocumentService extends AbstractDocumentService<LessonPlace> {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        super();
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, LessonPlaceModel);
    }

    protected getDocument(): any {
        return this._document;
    }

    findById(id: string): Observable<LessonPlace | void> {
        return fromPromise(this._document.findById(id).populate('comments.user', 'fullname'))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as LessonPlace) :
                        of(undefined)
                )
            )
    }

    create(lessonPlace: LessonPlace): Observable<LessonPlace> {
        return fromPromise(this._document.findOne({
            name_teacher: { $regex: new RegExp(lessonPlace.name_teacher, 'i') }
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`lessonPlace with name_teacher '${lessonPlace.name_teacher}' already exists`)
                    ) :
                    fromPromise(this._document.create(lessonPlace))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as LessonPlace)
            );
    }


    createComment(id: string, comment: Comment): Observable<LessonPlace> {
        return fromPromise(this._document.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as LessonPlace) :
                        of(undefined)
                )
            )
    }

    removeCommentById(id: string, commentId: string): Observable<LessonPlace> {
        return fromPromise(this._document.findByIdAndUpdate(id, { $pull: { comments: {_id: commentId} } }, { new: true}))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as LessonPlace) :
                        of(undefined)
                )
            )
    }

}

