import {DocumentService} from '../../interfaces';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';
import {HTTPHandlerResponse} from '@hapiness/core';


export abstract class AbstractService<T> {

    constructor(private _documentService: DocumentService<T>, private serviceName: string) {}

    listAll(): Observable<T[] | void> {
        return this._documentService.find();
    }

    /**
     * Returns one T of the list matching id in parameter
     *
     * @param {string} id of the T object
     *
     * @returns {Observable<T>}
     */
    one(id: string): Observable<T> {
        return this._documentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if object already exists and add it the list
     *
     *
     * @returns {Observable<HTTPHandlerResponse>}
     * @param document
     */
    create(document: T): Observable<HTTPHandlerResponse> {
        return this._add(document)
            .pipe(
                flatMap(_ => this._documentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`erreur abstract.service`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Add with good data in Any list
     *
     *
     * @returns {Observable<any>}
     *
     * @private
     * @param document
     */
    private _add(document: T): Observable<any> {
        return of(document);
    }



    /**
     * Update
     *
     * @param {string} id of who wont to update
     * @param document data to update
     *
     * @returns {Observable<T>}
     */
    update(id: string, document: T): Observable<T> {
        return this._documentService.findByIdAndUpdate(id, document)
            .pipe(
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                        Biim.conflict(e.message)
                    ) :
                    throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`${this.serviceName} with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes
     *
     * @param {string} id who wont to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._documentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`${this.serviceName} with id '${id}' not found`))
                )
            );
    }
}
