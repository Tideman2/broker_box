'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import { handleServerForgotPassword } from '@/app/actions/auth-actions';
import { PATHS } from '@/routes/paths';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ResetPasswordEmail() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (!EMAIL_REGEX.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);

        try {
            const result = await handleServerForgotPassword({ email });

            if (!result.success) {
                setError(result.error);
                return;
            }

            const params = new URLSearchParams({
                email,
                timeout: String(result.data.timeout),
            });

            router.push(
                `${PATHS.auth.resetPassword.verify}?${params.toString()}`
            );
        } catch (submitError) {
            console.error('Password reset request failed:', submitError);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    Reset password
                </Typography>
                <ThemeToggleButtonComponent />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                Enter the email linked to your account and we&apos;ll send you a
                one-time code.
            </Typography>

            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={Boolean(error)}
                    helperText={error}
                />

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
                        'Send reset code'
                    )}
                </Button>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                    Remembered it?{' '}
                    <Link href={PATHS.auth.login} style={{ textDecoration: 'underline' }}>
                        Back to login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
