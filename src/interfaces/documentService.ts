import { Observable } from 'rxjs/Observable';

export interface DocumentService<T> {
    find(): Observable<T[] | void>;
    findById(id: string): Observable<T | void>;
    create(document: T): Observable<T>;
    findByIdAndUpdate(id: string, document: T): Observable<T>;
    findByIdAndRemove(id: string): Observable<T>;
}
