'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Checkbox, FormControlLabel, Button, Stack, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

import { registerUser } from '@/api/auth';
import { PATHS } from '@/routes/paths';
import { RegisterContext } from '@/contexts/register/context';

export default function TermsStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addSecurityInfo, goToPreviousStep, setError, setLoading } = ctx;
    const router = useRouter();

    const data = state.state;
    console.log('TermsStep data:', data);

    const handleFinish = () => {
        if (!data.acceptTerms) {
            setError('You must accept the terms and conditions to proceed.');
            return;
        }
        setError(null);
        setLoading(true);

        registerUser(data)
            .then(() => {
                router.push(PATHS.dashboard.root);
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                setError('Registration failed. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Stack spacing={3}>
            <Typography variant="h4">Terms & Conditions</Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.acceptTerms}
                        onChange={(e) => addSecurityInfo(e.target.checked, data.marketingOptIn)}
                    />
                }
                label="I accept the terms and conditions"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.marketingOptIn}
                        onChange={(e) => addSecurityInfo(data.acceptTerms, e.target.checked)}
                    />
                }
                label="Receive marketing emails"
            />

            <Stack direction="row" spacing={2}>
                <Button onClick={goToPreviousStep}>Back</Button>
                <Button variant="contained" onClick={handleFinish}>
                    {state.loading ? (
                        <CircularProgress
                            size={24}
                            color="inherit"
                        />
                    ) : (
                        'Finish'
                    )}
                </Button>
            </Stack>
        </Stack>
    );
}