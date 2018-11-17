import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { People } from '../../interfaces';
import { PeopleDocumentService } from '../people-document';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable()
export class PeopleService {
    /**
     * Class constructor
     */
    constructor(private _peopleDocumentService: PeopleDocumentService) {}

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<People[]>}
     */
    listAll(): Observable<People[] | void> {
        return this._peopleDocumentService.find();
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
     */
    one(id: string): Observable<People> {
        return this._peopleDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }


    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(person: People): Observable<HTTPHandlerResponse> {
        return this._peopleDocumentService.create(person)
            .pipe(
                flatMap(_ => this._peopleDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<People>}
     */
    update(id: string, person: People): Observable<People> {
        return this._peopleDocumentService.findByIdAndUpdate(id, person)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._peopleDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }
}
