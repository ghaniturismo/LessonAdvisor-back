import {Address} from './lessonPlace';

export interface People {
    id?: string;
    photo?: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: Address;
}
