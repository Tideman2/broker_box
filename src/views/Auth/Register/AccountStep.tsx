'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { RegisterContext } from '@/contexts/register/context';
import { z } from 'zod';

const accountSchema = z
    .object({
        fullName: z.string().min(1, 'Full name is required'),
        email: z.string().email('Enter a valid email'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function AccountStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addAccountInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const result = accountSchema.safeParse(data);

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
        <Stack spacing={3}>
            <Typography variant="h4">Account Info</Typography>

            <TextField
                label="Full Name"
                value={data.fullName}
                onChange={(e) =>
                    addAccountInfo(data.email, data.password, data.confirmPassword, e.target.value)
                }
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
            />

            <TextField
                label="Email"
                value={data.email}
                onChange={(e) =>
                    addAccountInfo(e.target.value, data.password, data.confirmPassword, data.fullName)
                }
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
            />

            <TextField
                label="Password"
                type="password"
                value={data.password}
                onChange={(e) =>
                    addAccountInfo(data.email, e.target.value, data.confirmPassword, data.fullName)
                }
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
            />

            <TextField
                label="Confirm Password"
                type="password"
                value={data.confirmPassword}
                onChange={(e) =>
                    addAccountInfo(data.email, data.password, e.target.value, data.fullName)
                }
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
            />

            <Stack direction="row" spacing={2}>
                <Button onClick={goToPreviousStep}>Back</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Continue
                </Button>
            </Stack>
        </Stack>
    );
}