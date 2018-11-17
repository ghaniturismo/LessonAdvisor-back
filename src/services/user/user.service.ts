import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {Biim} from '@hapiness/biim';
import {UserDocumentService} from '../user-document';
import {User} from '../../interfaces';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {throwError} from 'rxjs';

@Injectable()
export class UserService {

    constructor(private _userDocumentService: UserDocumentService) {}

    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(user: User): Observable<HTTPHandlerResponse> {
        return this._userDocumentService.create(user)
            .pipe(
                flatMap(_ => this._userDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`User with fullname '${user.fullname}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }
}
