type RegistrationData = {
    country: string;

    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;

    phone: string;
    dob: string;
    username?: string;

    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;

    acceptTerms: boolean;
    marketingOptIn?: boolean;
};

type Step =
    | 'country'
    | 'account'
    | 'personal'
    | 'address'
    | 'security'
    | 'terms';

