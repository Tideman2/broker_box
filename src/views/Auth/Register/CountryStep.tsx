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
        <Stack spacing={3}>
            <Typography variant="h4">Select Country</Typography>

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

            <Button variant="contained" onClick={goToNextStep}>
                Continue
            </Button>
        </Stack>
    );
}