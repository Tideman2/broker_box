'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { z } from 'zod';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import { handleServerResetPassword } from '@/app/actions/auth-actions';
import { PATHS } from '@/routes/paths';

const resetSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function CompleteReset() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get('email') ?? '';
    const token = searchParams.get('token') ?? '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email || !token) {
            router.replace(PATHS.auth.resetPassword.root);
        }
    }, [email, token, router]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');

        const result = resetSchema.safeParse({ password, confirmPassword });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0] as string] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const actionResult = await handleServerResetPassword({
                email,
                new_password: result.data.password,
                reset_token: token,
            });

            if (!actionResult.success) {
                setFormError(actionResult.error);
                return;
            }

            router.push(PATHS.auth.resetPassword.success);
        } catch (resetError) {
            console.error('Password reset failed:', resetError);
            setFormError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!email || !token) return null;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={2}
            noValidate
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                    Set new password
                </Typography>
                <ThemeToggleButtonComponent />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                Choose a new password for <strong>{email}</strong>.
            </Typography>

            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                />

                {formError && (
                    <Alert severity="error" variant="outlined">
                        {formError}
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Reset password'
                    )}
                </Button>
            </Box>
        </Box>
    );
}
