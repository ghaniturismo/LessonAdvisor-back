import { Injectable } from '@hapiness/core';
import { LessonPlaceDocumentService } from '../lessonPlace-document';

import { AbstractService } from '../abstract';
import {LessonPlace} from '../../interfaces/lessonPlace';

@Injectable()
export class LessonPlaceService extends AbstractService<LessonPlace> {
    /**
     * Class constructor
     */
    constructor(_lessonPlaceDocumentService: LessonPlaceDocumentService) {
        super(_lessonPlaceDocumentService, 'LessonPlace');
    }
}
