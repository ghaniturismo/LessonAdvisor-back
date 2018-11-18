import {Config} from '@hapiness/config';
import {AbstractDocumentService} from '../abstract-document';
import {Injectable} from '@hapiness/core';
import {LessonPlace} from '../../interfaces';
import {MongoClientService} from '@hapiness/mongo';
import {LessonPlaceModel} from '../../models/lessonPlace';
import {from, Observable} from 'rxjs';
import {MongooseDocument} from 'mongoose';
import {map} from 'rxjs/operators';


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

    findById(id: string): Observable<LessonPlace | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    create(lessonPlace: LessonPlace): Observable<LessonPlace> {
        return from(this._document.create(lessonPlace))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    protected getDocument(): any {
        return this._document;
    }

}

