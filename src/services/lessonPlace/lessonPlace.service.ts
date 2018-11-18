import { Injectable} from '@hapiness/core';
import { LessonPlaceDocumentService } from '../lessonPlace-document';

import {LessonPlace} from '../../interfaces';
import {AbstractService} from '../abstract';

@Injectable()
export class LessonPlaceService extends AbstractService<LessonPlace> {
    /**
     * Class constructor
     */
    constructor(_lessonPlaceDocumentService: LessonPlaceDocumentService) {
        super(_lessonPlaceDocumentService, 'LessonPlace');
    }
}
