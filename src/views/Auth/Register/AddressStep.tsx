'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

export default function AddressStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addAddressInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    return (
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Address info</Typography>
                <Typography variant="body2" color="text.secondary">
                    Where should we send account notices?
                </Typography>
            </Stack>

            <TextField
                label="Address Line 1"
                value={data.address1}
                autoComplete="address-line1"
                onChange={(e) =>
                    addAddressInfo(e.target.value, data.address2, data.city, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="Address Line 2"
                value={data.address2}
                autoComplete="address-line2"
                onChange={(e) =>
                    addAddressInfo(data.address1, e.target.value, data.city, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="City"
                value={data.city}
                autoComplete="address-level2"
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, e.target.value, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="State"
                value={data.state}
                autoComplete="address-level1"
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, e.target.value, data.zip)
                }
                fullWidth
            />

            <TextField
                label="Zip Code"
                value={data.zip}
                autoComplete="postal-code"
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, data.state, e.target.value)
                }
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
