'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { RegisterContext } from '@/contexts/register/context';
import { z } from 'zod';

const addressSchema = z.object({
    address1: z.string().trim().min(3, 'Address must be at least 3 characters'),
    address2: z.string().trim().optional(),
    city: z.string().trim().min(2, 'City must be at least 2 characters'),
    state: z.string().trim().min(2, 'State must be at least 2 characters'),
    zip: z.string().trim().min(3, 'Zip code must be at least 3 characters'),
});

export default function AddressStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addAddressInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const result = addressSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        goToNextStep();
    };

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
                error={!!errors.address1}
                helperText={errors.address1}
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
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
            />

            <TextField
                label="State"
                value={data.state}
                autoComplete="address-level1"
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, e.target.value, data.zip)
                }
                error={!!errors.state}
                helperText={errors.state}
                fullWidth
            />

            <TextField
                label="Zip Code"
                value={data.zip}
                autoComplete="postal-code"
                onChange={(e) =>
                    addAddressInfo(data.address1, data.address2, data.city, data.state, e.target.value)
                }
                error={!!errors.zip}
                helperText={errors.zip}
                fullWidth
            />

            <Stack direction="row" spacing={2}>
                <Button onClick={goToPreviousStep} color="inherit">Back</Button>
                <Button variant="contained" fullWidth size="large" onClick={handleSubmit}>
                    Continue
                </Button>
            </Stack>
        </Stack>
    );
}
