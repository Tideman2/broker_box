export enum UserRole {
    USER = 'USER',
}

export type User = {
    id: number;

    country: string;

    email: string;

    full_name: string;

    phone: string;

    dob: string | null;

    username: string | null;

    address1: string;

    address2: string | null;

    city: string;

    state: string;

    zip: string;

    role: UserRole;


};
