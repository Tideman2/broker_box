'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { RegisterContext } from '@/contexts/register/context';
import { z } from 'zod';

const accountSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, 'Full name must be at least 2 characters')
            .max(100, 'Full name must be at most 100 characters'),
        email: z.string().trim().email('Enter a valid email'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password must be at most 100 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Confirm your password')
            .max(100, 'Confirm password must be at most 100 characters'),
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
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h6">Account info</Typography>
                <Typography variant="body2" color="text.secondary">
                    This is how you will log in to Merchant Box.
                </Typography>
            </Stack>

            <TextField
                label="Full Name"
                value={data.fullName}
                autoComplete="name"
                onChange={(e) =>
                    addAccountInfo(data.email, data.password, data.confirmPassword, e.target.value)
                }
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
            />

            <TextField
                label="Email"
                type="email"
                value={data.email}
                autoComplete="email"
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
                autoComplete="new-password"
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
                autoComplete="new-password"
                onChange={(e) =>
                    addAccountInfo(data.email, data.password, e.target.value, data.fullName)
                }
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
