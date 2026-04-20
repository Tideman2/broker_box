'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { RegisterContext } from '@/contexts/register/context';

export default function AddressStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addAddressInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    return (
        <Stack spacing={3}>
            <Typography variant="h4">Address Info</Typography>

            <TextField
                label="Address Line 1"
                value={data.address1}
                onChange={(e) =>
                    addAddressInfo(e.target.value, data.address2, data.city, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="Address Line 2"
                value={data.address2}
                onChange={(e) =>
                    addAddressInfo(data.address1, e.target.value, data.city, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="City"
                value={data.city}
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, e.target.value, data.state, data.zip)
                }
                fullWidth
            />

            <TextField
                label="State"
                value={data.state}
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, e.target.value, data.zip)
                }
                fullWidth
            />

            <TextField
                label="Zip Code"
                value={data.zip}
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, data.state, e.target.value)
                }
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