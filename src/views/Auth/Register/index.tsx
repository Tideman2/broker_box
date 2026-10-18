'use client';
import { Stack, Typography, Alert } from '@mui/material';
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
        <Stack spacing={2.5} sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack spacing={0.5}>
                    <Typography variant="h4">
                        Create account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Five quick steps to get trading.
                    </Typography>
                </Stack>
                <ThemeToggleButtonComponent />
            </Stack>
            <RegisterStepper />
            {state.error && (
                <Alert severity="error" variant="outlined">
                    <Typography variant="body2">{state.error}</Typography>
                </Alert>
            )}
            {renderCurrentStep()}
        </Stack>
    );
}
