'use client';

import { TextField, Button, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { RegisterContext } from '@/contexts/register/context';
import { z } from 'zod';

const personalSchema = z.object({
    phone: z
        .string()
        .trim()
        .min(8, 'Phone must be at least 8 characters')
        .max(20, 'Phone must be at most 20 characters'),
    dob: z.string().trim().min(1, 'Date of birth is required'),
    username: z
        .string()
        .trim()
        .optional()
        .refine(
            (value) => !value || value.length >= 3,
            'Username must be at least 3 characters'
        ),
});

export default function PersonalStep() {
    const ctx = useContext(RegisterContext)!;
    const { state, addPersonalInfo, goToNextStep, goToPreviousStep } = ctx;

    const data = state.state;

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const result = personalSchema.safeParse(data);

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
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
            />

            <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={data.dob}
                autoComplete="bday"
                onChange={(e) => addPersonalInfo(data.phone, e.target.value, data.username)}
                error={!!errors.dob}
                helperText={errors.dob}
                fullWidth
            />

            <TextField
                label="Username (optional)"
                value={data.username}
                autoComplete="username"
                onChange={(e) => addPersonalInfo(data.phone, data.dob, e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
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
