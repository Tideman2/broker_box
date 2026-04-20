'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

export default function PersonalStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addPersonalInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    return (
        <Stack spacing={3}>
            <Typography variant="h4">Personal Info</Typography>

            <TextField
                label="Phone"
                value={data.phone}
                onChange={(e) => addPersonalInfo(e.target.value, data.dob, data.username)}
                fullWidth
            />

            <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={data.dob}
                onChange={(e) => addPersonalInfo(data.phone, e.target.value, data.username)}
                fullWidth
            />

            <TextField
                label="Username (optional)"
                value={data.username}
                onChange={(e) => addPersonalInfo(data.phone, data.dob, e.target.value)}
                fullWidth
            />

            <Stack direction="row" spacing={2}>
                <Button onClick={goToPreviousStep}>Back</Button>
                <Button variant="contained" onClick={goToNextStep}>
                    Continue
                </Button>
            </Stack>
        </Stack>
    );
}