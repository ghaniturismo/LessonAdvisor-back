import {Injectable} from '@hapiness/core';

import {UserDocumentService} from '../user-document';
import {User} from '../../interfaces';


import { AbstractService } from '../abstract';

@Injectable()
export class UserService extends AbstractService<User> {

    constructor(userDocumentService: UserDocumentService) {
        super(userDocumentService, 'User');
    }
}
