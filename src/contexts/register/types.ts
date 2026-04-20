export type RegistrationData = {
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

export type Step =
    | 'country'
    | 'account'
    | 'personal'
    | 'address'
    | 'finish';


export type RegisterStateType = {
    // Context
    state: RegistrationData;
    //navigation
    currentStep: Step;
    // ui
    laoding: boolean;
    error: string | null
}



export type RegisterReducer =
    | { type: 'ADD_COUNTRY_INFO', payload: string }
    | { type: 'ADD_ACCOUNT_INFO', payload: { email: string; password: string; confirmPassword: string; fullName: string } }
    | { type: 'ADD_PERSONAL_INFO', payload: { phone: string; dob: string; username?: string } }
    | { type: 'ADD_ADDRESS_INFO', payload: { address1: string; address2?: string; city: string; state: string; zip: string } }
    | { type: 'ADD_SECURITY_INFO', payload: { acceptTerms: boolean; marketingOptIn?: boolean } }
    | { type: 'GO_TO_STEP', payload: Step }
    | { type: 'SET_LOADING', payload: boolean }
    | { type: 'SET_ERROR', payload: string | null }
    | { type: 'RESET_REGISTRATION' };


export interface RegisterContextType {
    // Context
    state: RegisterStateType;
    //navigation
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    //actions
    addCountryInfo: (country: string) => void;
    addAccountInfo: (email: string, password: string, confirmPassword: string, fullName: string) => void;
    addPersonalInfo: (phone: string, dob: string, username?: string) => void;
    addAddressInfo: (address1: string, address2: string | undefined, city: string, state: string, zip: string) => void;
    addSecurityInfo: (acceptTerms: boolean, marketingOptIn?: boolean) => void;
}