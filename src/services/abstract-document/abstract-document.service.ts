import { DocumentService } from '../../interfaces/documentService';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { flatMap, map } from 'rxjs/operators';
import { MongooseDocument } from 'mongoose';
import {from} from 'rxjs';


export abstract class AbstractDocumentService<T> implements DocumentService<T> {

    protected abstract getDocument(): any;

    /**
     * Call mongoose method, call toJSON on each result and returns T[] or undefined
     *
     * @return {Observable<T[] | void>}
     */
    find(): Observable<void | T[]> {
        return from(this.getDocument().find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one T of the list matching id in parameter
     *
     * @param {string} id of the T in the db
     *
     * @return {Observable<T | void>}
     */
    findById(id: string): Observable<void | T> {
        return fromPromise(this.getDocument().findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as T) :
                        of(undefined)
                )
            )
    }

    /**
     * Check if person already exists and add it in T list
     *
     * @param {T} document to create
     *
     * @return {Observable<T>}
     */
    abstract create(document: T): Observable<T>;

    /**
     * Update a person in T list
     *
     * @param {string} id
     * @param {T} document
     *
     * @return {Observable<T>}
     */
    findByIdAndUpdate(id: string, document: T): Observable<T> {
        return fromPromise(this.getDocument().findByIdAndUpdate(id, document, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as T) :
                        of(undefined)
                )
            )
    }

    /**
     * Delete a person in T list
     *
     * @param {string} id
     *
     * @return {Observable<T>}
     */
    findByIdAndRemove(id: string): Observable<T> {
        return fromPromise(this.getDocument().findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as T) :
                        of(undefined)
                )
            )
    }

}
