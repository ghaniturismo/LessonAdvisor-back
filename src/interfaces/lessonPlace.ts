import { User } from './user';

export interface LessonPlace {
    id?: string,
    name_teacher: string,
    email?: string,
    phone?: string,
    website?: string,
    address: Address,
    description?: string,
    numberOfPerson?: number,
    comments?: Comment[]
}

export interface Address {
    street: string;
    postalCode: number;
    city: string;
}

export interface Comment {
    id?: string,
    user: User | string,
    rating: number,
    text: string
}
