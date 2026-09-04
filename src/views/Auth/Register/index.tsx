'use client';
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useRegister } from '@/contexts/register/hook';
import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';

import CountryStep from './CountryStep';
import AccountStep from './AccountStep';
import PersonalStep from './PersonalStep';
import AddressStep from './AddressStep';
import TermsStep from './TermsStep';
import RegisterStepper from './RegisterStepper';

export default function Register() {
    const { state, setError } = useRegister();

    const renderCurrentStep = () => {

        switch (state.currentStep) {
            case 'country':
                return <CountryStep />;
            case 'account':
                return <AccountStep />;
            case 'personal':
                return <PersonalStep />;
            case 'address':
                return <AddressStep />;
            case 'finish':
                return <TermsStep />;
            default:
                return null;
        }
    }

    useEffect(() => {
        setError(null)
    }, [state.currentStep])

    return (
        <Stack spacing={3}>
            <ThemeToggleButtonComponent />
            <RegisterStepper />
            {state.error && <Typography variant="body2" color="error">{state.error}</Typography>}
            {renderCurrentStep()}
        </Stack>
    );
}