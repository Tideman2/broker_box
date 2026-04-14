import { RegistrationData, RegisterReducer, RegisterStateType } from "./types"

const registrationData: RegistrationData = {
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    dob: '',
    username: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    acceptTerms: false,
    marketingOptIn: false,
}

export const initialState: RegisterStateType = {
    state: registrationData,
    currentStep: 'country',
    laoding: false,
    error: null,
}

export const registerReducer = (state: RegisterStateType, action: RegisterReducer) => {
    switch (action.type) {
        case 'ADD_COUNTRY_INFO': {
            const updatedState = { ...state.state, country: action.payload }

            return {
                ...state,
                state: updatedState
            }
        }

        case 'ADD_ACCOUNT_INFO':
            {
                const updatedState = {
                    ...state.state,
                    email: action.payload.email,
                    password: action.payload.password,
                    confirmPassword: action.payload.confirmPassword,
                    fullName: action.payload.fullName,
                }

                return {
                    ...state,
                    state: updatedState,
                }
            }

        case 'ADD_PERSONAL_INFO': {
            const updatedState = {
                ...state.state,
                phone: action.payload.phone,
                dob: action.payload.dob,
                username: action.payload.username,
            }

            return {
                ...state,
                state: updatedState
            }
        }

        case 'ADD_ADDRESS_INFO': {
            const updatedState = {
                ...state.state,
                address1: action.payload.address1,
                address2: action.payload.address2,
                city: action.payload.city,
                state: action.payload.state,
                zip: action.payload.zip,
            }

            return {
                ...state,
                state: updatedState
            }
        }

        case 'ADD_SECURITY_INFO': {
            const updatedState = {
                ...state.state,
                acceptTerms: action.payload.acceptTerms,
                marketingOptIn: action.payload.marketingOptIn,
            }

            return {
                ...state,
                state: updatedState
            }
        }

        case 'GO_TO_STEP': {

            return {
                ...state,
                currentStep: action.payload,
            }
        }

        case 'SET_LOADING': {

            return {
                ...state,
                laoding: action.payload,
            }
        }

        case 'SET_ERROR': {

            return {
                ...state,
                error: action.payload,
            }
        }

        case 'RESET_REGISTRATION':

            return initialState

        default:
            return state;
    }
}