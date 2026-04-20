'use client';

import { Checkbox, FormControlLabel, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

export default function TermsStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addSecurityInfo, goToPreviousStep } = ctx;

    const data = state.state;
    console.log('TermsStep data:', data);
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
                <Button variant="contained" onClick={() => alert('Registration complete!')}>
                    Finish
                </Button>
            </Stack>
        </Stack>
    );
}