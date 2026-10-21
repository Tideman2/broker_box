export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

/** `currency_display` values accepted by `GET`/`PATCH /user/preferences`. */
export type CurrencyDisplay = 'usd' | 'eur' | 'gbp';

export type User = {
    id: number;

    /** Joined from the address row; null when no address row exists. */
    country: string | null;

    /** Read-only from the client's point of view. */
    email: string;

    full_name: string;

    /** Read-only. */
    phone: string;

    dob: string | null;

    username: string | null;

    address1: string | null;

    address2: string | null;

    city: string | null;

    state: string | null;

    zip: string | null;

    role: UserRole;
};

/** `GET /user/preferences` response. */
export type Preferences = {
    currency_display: CurrencyDisplay;
};

/** `PATCH /auth/user` — the only editable profile field from Settings. */
export type UpdateProfilePayload = {
    full_name: string;
};

/** `POST /auth/change-password` — confirm-password is never sent. */
export type ChangePasswordPayload = {
    current_password: string;
    new_password: string;
};

export type ChangePasswordResponse = {
    message: string;
};

/** `POST /auth/login` — the response is a raw object, there is no envelope. */
export type LoginResponse = {
    user_id: number;
    token: string;
    refresh_token: string;
};

/** `POST /auth/register`. */
export type RegisterResponse = {
    id: number;
    message: string;
    token: string;
    refresh_token: string;
};
