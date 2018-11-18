import { User } from './user';
import { Address } from './people';

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

export interface Comment {
    id?: string,
    user: User | string,
    rating: number,
    text: string
}
