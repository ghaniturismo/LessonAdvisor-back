export interface LessonPlace {
    id?: string;
    name_teacher: string;
    email?: string;
    phone?: string;
    website?: string;
    address: Address;
    description?: string;
    numberOfPerson?: number;
}

export interface Address {
    street: string;
    postalCode: number;
    city: string;
}
