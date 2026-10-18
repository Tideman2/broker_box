'use client';

import { TextField, Button, Stack, Typography, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

const COUNTRIES = [
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
];

export default function CountryStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addCountryInfo, goToNextStep } = ctx;

    return (
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Select country</Typography>
                <Typography variant="body2" color="text.secondary">
                    Choose where you live so we can show the right options.
                </Typography>
            </Stack>

            <TextField
                select
                label="Country"
                value={state.state.country}
                onChange={(e) => addCountryInfo(e.target.value)}
                fullWidth
            >
                {COUNTRIES.map((country) => (
                    <MenuItem key={country} value={country}>
                        {country}
                    </MenuItem>
                ))}
            </TextField>

            <Button variant="contained" fullWidth size="large" onClick={goToNextStep}>
                Continue
            </Button>
        </Stack>
    );
}
