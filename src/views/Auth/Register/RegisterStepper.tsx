'use client';

import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';
import { REGISTRATION_STEPS_DATA } from '@/contexts/register/const';

export default function RegisterStepper() {
    const ctx = useContext(RegisterContext)!;
    const { state } = ctx;

    const activeStep = REGISTRATION_STEPS_DATA.findIndex(
        (step) => step.key === state.currentStep
    );

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                    '& .MuiStepIcon-root': {
                        color: 'divider',
                    },

                    '& .MuiStepIcon-root.Mui-active': {
                        color: 'primary.main',
                        filter: 'drop-shadow(0 0 6px rgba(0,214,255,0.6))',
                    },

                    '& .MuiStepIcon-root.Mui-completed': {
                        color: 'success.main',
                    },

                    '& .MuiStepLabel-label': {
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                    },

                    '& .MuiStepLabel-label.Mui-active': {
                        color: 'text.primary',
                        fontWeight: 600,
                    },

                    '& .MuiStepConnector-line': {
                        borderColor: 'divider',
                    },
                }}
            >
                {REGISTRATION_STEPS_DATA.map((step) => (
                    <Step key={step.key}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}