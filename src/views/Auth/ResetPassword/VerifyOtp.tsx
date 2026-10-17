'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import {
    handleServerForgotPassword,
    handleServerVerifyOtp,
} from '@/app/actions/auth-actions';
import { PATHS } from '@/routes/paths';

import OtpInput from './components/OtpInput';

const OTP_LENGTH = 6;

const formatCountdown = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

export default function VerifyOtp() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get('email') ?? '';
    const timeoutParam = Number(searchParams.get('timeout'));

    const [otp, setOtp] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(
        Number.isFinite(timeoutParam) && timeoutParam > 0 ? timeoutParam : 0
    );
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        if (!email) {
            router.replace(PATHS.auth.resetPassword.root);
        }
    }, [email, router]);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const id = window.setTimeout(
            () => setSecondsLeft((current) => Math.max(0, current - 1)),
            1000
        );

        return () => window.clearTimeout(id);
    }, [secondsLeft]);

    const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setNotice('');

        if (otp.length !== OTP_LENGTH) {
            setError(`Enter the ${OTP_LENGTH}-digit code.`);
            return;
        }

        setLoading(true);

        try {
            const result = await handleServerVerifyOtp({ email, otp });

            if (!result.success) {
                setError(result.error);
                return;
            }

            const params = new URLSearchParams({
                email,
                token: result.data.password_reset_token,
            });

            router.push(
                `${PATHS.auth.resetPassword.complete}?${params.toString()}`
            );
        } catch (verifyError) {
            console.error('OTP verification failed:', verifyError);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setNotice('');
        setResending(true);

        try {
            const result = await handleServerForgotPassword({ email });

            if (!result.success) {
                setError(result.error);
                return;
            }

            setOtp('');
            setSecondsLeft(result.data.timeout);
            setNotice(result.data.message);
        } catch (resendError) {
            console.error('Resending OTP failed:', resendError);
            setError('Something went wrong. Please try again.');
        } finally {
            setResending(false);
        }
    };

    if (!email) return null;

    return (
        <Box
            component="form"
            onSubmit={handleVerify}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={2}
            noValidate
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">
                    Verify code
                </Typography>
                <ThemeToggleButtonComponent />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                We sent a one-time code to <strong>{email}</strong>. Enter it below
                to continue.
            </Typography>

            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    disabled={loading || resending}
                />

                {error && (
                    <Alert severity="error" variant="outlined">
                        {error}
                    </Alert>
                )}

                {notice && (
                    <Alert severity="success" variant="outlined">
                        {notice}
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading || resending || otp.length !== OTP_LENGTH}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Verify code'
                    )}
                </Button>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="caption" color="text.secondary">
                        {secondsLeft > 0
                            ? `Resend code in ${formatCountdown(secondsLeft)}`
                            : "Didn't get the code?"}
                    </Typography>

                    <Button
                        size="small"
                        variant="text"
                        onClick={handleResend}
                        disabled={secondsLeft > 0 || resending || loading}
                    >
                        {resending ? 'Sending...' : 'Resend code'}
                    </Button>
                </Stack>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                    Wrong address?{' '}
                    <Link href={PATHS.auth.resetPassword.root} style={{ textDecoration: 'underline' }}>
                        Change email
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
