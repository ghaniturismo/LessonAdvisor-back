import {MongoClientService} from '@hapiness/mongo';

import {UserModel} from '../../models/user';
import {User} from '../../interfaces';

import {fromPromise} from 'rxjs/observable/fromPromise';
import {_throw} from 'rxjs/observable/throw';
import { flatMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MongooseDocument } from 'mongoose';
import {AbstractDocumentService} from '../abstract-document';
import {Injectable} from '@hapiness/core';
import {Config} from '@hapiness/config';

@Injectable()
export class UserDocumentService extends AbstractDocumentService<User> {
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
        }, UserModel);
    }

    protected getDocument(): any {
        return this._document;
    }

    create(user: User): Observable<User> {
        return fromPromise(this._document.findOne({
            email: { $regex: new RegExp(user.email, 'i') }
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`User with email '${user.email}' already exists`)
                    ) :
                    fromPromise(this._document.create(user))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as User),
                tap((u: User) => u.password = '')
            );
    }

    /**
     * Returns an user maching the id and hides his password
     * @param {String} id
     * @returns {Observable<void | User>}
     */
    findById(id: string): Observable<void | User> {
        return super.findById(id).pipe(
            tap((user: User) =>
                !!user ?
                    user.password = '' :
                    undefined
            )
        );
    }
}
