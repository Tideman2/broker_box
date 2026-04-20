'use client';
import { Stack, Typography, styled, IconButton, } from '@mui/material';
import { Brightness7 } from '@mui/icons-material';
import { useEffect } from 'react';

import { useRegister } from '@/contexts/register/hook';
import { useThemeMode } from '@/contexts/theme/hooks';

import CountryStep from './CountryStep';
import AccountStep from './AccountStep';
import PersonalStep from './PersonalStep';
import AddressStep from './AddressStep';
import TermsStep from './TermsStep';
import RegisterStepper from './RegisterStepper';

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(2),
    zIndex: 1500,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function Register() {
    const { state, setError } = useRegister();
    const { toggleTheme } = useThemeMode();

    const renderCurrentStep = () => {
        console.log('Rendering step:', state.currentStep);
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
    console.log('Current registration step:', state.currentStep);
    useEffect(() => {
        setError(null)
    }, [state.currentStep])

    return (
        <Stack spacing={3}>
            <ThemeToggleButton onClick={toggleTheme}>
                <Brightness7 />
            </ThemeToggleButton>
            <RegisterStepper />
            {state.error && <Typography variant="body2" color="error">{state.error}</Typography>}
            {renderCurrentStep()}
        </Stack>
    );
}