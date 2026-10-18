'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

export default function PersonalStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addPersonalInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    return (
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Personal info</Typography>
                <Typography variant="body2" color="text.secondary">
                    Tell us a little about yourself.
                </Typography>
            </Stack>

            <TextField
                label="Phone"
                type="tel"
                value={data.phone}
                autoComplete="tel"
                onChange={(e) => addPersonalInfo(e.target.value, data.dob, data.username)}
                fullWidth
            />

            <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={data.dob}
                autoComplete="bday"
                onChange={(e) => addPersonalInfo(data.phone, e.target.value, data.username)}
                fullWidth
            />

            <TextField
                label="Username (optional)"
                value={data.username}
                autoComplete="username"
                onChange={(e) => addPersonalInfo(data.phone, data.dob, e.target.value)}
                fullWidth
            />

            <Stack direction="row" spacing={2}>
                <Button onClick={goToPreviousStep} color="inherit">Back</Button>
                <Button variant="contained" fullWidth size="large" onClick={goToNextStep}>
                    Continue
                </Button>
            </Stack>
        </Stack>
    );
}
