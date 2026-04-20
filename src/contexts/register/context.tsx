import React, { useMemo, useEffect, useReducer, useCallback, createContext } from 'react';
import { RegisterContextType, Step } from './types';
import { registerReducer, initialState } from './reducer';
import { REGISTRATION_STEPS } from './const';
import { canProcedeToNextStep } from './utils';

export const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(registerReducer, initialState);

    // ----------------------------------------------------------------------
    // Reset registration state when component unmounts
    // ----------------------------------------------------------------------
    useEffect(() => {
        return () => {
            dispatch({ type: 'RESET_REGISTRATION' });
        };
    }, []);
    // ----------------------------------------------------------------------

    // ----------------------------------------------------------------------
    // Registration action functions
    // ----------------------------------------------------------------------
    const addCountryInfo = useCallback((country: string) => {
        console.log('Adding country info:', country);
        dispatch({ type: 'ADD_COUNTRY_INFO', payload: country });
    }, []);

    const addAccountInfo = useCallback((email: string, password: string, confirmPassword: string, fullName: string) => {
        dispatch({ type: 'ADD_ACCOUNT_INFO', payload: { email, password, confirmPassword, fullName } });
    }, []);

    const addPersonalInfo = useCallback((phone: string, dob: string, username?: string) => {
        dispatch({ type: 'ADD_PERSONAL_INFO', payload: { phone, dob, username } });
    }, []);

    const addAddressInfo = useCallback((address1: string, address2: string | undefined, city: string, state: string, zip: string) => {
        dispatch({ type: 'ADD_ADDRESS_INFO', payload: { address1, address2, city, state, zip } });
    }, []);

    const addSecurityInfo = useCallback((acceptTerms: boolean, marketingOptIn?: boolean) => {
        dispatch({ type: 'ADD_SECURITY_INFO', payload: { acceptTerms, marketingOptIn } });
    }, []);

    // ----------------------------------------------------------------------
    // Navigation functions
    // ----------------------------------------------------------------------

    const goToNextStep = useCallback(() => {
        const currentStep = state.currentStep;
        const currentIndex = REGISTRATION_STEPS.indexOf(currentStep);
        const nextIndex = currentIndex + 1;
        const nextStep = REGISTRATION_STEPS[nextIndex];
        console.log('Going to next step:', nextStep);

        if (nextIndex === -1) {
            console.warn(`Invalid step: ${nextStep}`);
            return;
        }

        if (!canProcedeToNextStep(state.state, currentStep)) {
            dispatch({ type: 'SET_ERROR', payload: 'Please fill in all required fields before proceeding.' });
            return;
        }

        dispatch({ type: "GO_TO_STEP", payload: nextStep as Step });
    }, [state.currentStep, state.state, dispatch]);

    const goToPreviousStep = useCallback(() => {
        const currentStep = state.currentStep;
        const currentIndex = REGISTRATION_STEPS.indexOf(currentStep);
        const previousIndex = currentIndex - 1;
        const previousStep = REGISTRATION_STEPS[previousIndex];
        console.log('Going to previous step:', previousStep);
        if (previousIndex === -1) {
            console.warn(`Invalid step: ${previousStep}`);
            return;
        }

        dispatch({ type: "GO_TO_STEP", payload: previousStep as Step });
    }, [state.currentStep, dispatch]);

    const setLoading = useCallback((isLoading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading });
    }, []);

    const setError = useCallback((error: string | null) => {
        dispatch({ type: 'SET_ERROR', payload: error });
    }, []);

    const value = useMemo(
        () => ({
            state,
            addCountryInfo,
            addAccountInfo,
            addPersonalInfo,
            addAddressInfo,
            addSecurityInfo,
            setLoading,
            setError,
            goToNextStep,
            goToPreviousStep,
        }),
        [
            state,
            addCountryInfo,
            addAccountInfo,
            addPersonalInfo,
            addAddressInfo,
            addSecurityInfo,
            setLoading,
            setError,
            goToNextStep,
            goToPreviousStep,
        ]
    );


    return (
        <RegisterContext.Provider value={value}>
            {children}
        </RegisterContext.Provider>
    );
}