'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    Alert,
} from '@mui/material';
import { CircularProgress } from '@mui/material';

import { PATHS } from '@/routes/paths';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import { handleServerLogin } from '@/app/actions/auth-actions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At least 8 characters, one uppercase letter, one lowercase letter,
// and one number.
// const PASSWORD_REGEX =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });


    const validate = () => {

        const newErrors = {
            email: '',
            password: '',
        };


        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!EMAIL_REGEX.test(email.trim())) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
        } else if (password.length > 100) {
            newErrors.password = 'Password must be at most 100 characters.';
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        setFormError('');
        setLoading(true);

        try {
            const result = await handleServerLogin({
                email: email.trim(),
                password,
            });

            if (!result.success) {
                setFormError(
                    result.status === 429
                        ? 'Too many attempts. Please wait a moment and try again.'
                        : result.error
                );

                return;
            }

            router.push(PATHS.dashboard.root);
        } catch (error) {
            console.error('Login failed:', error);

            setFormError('Login failed. Please try again.');
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
                    Welcome back
                </Typography>
                <ThemeToggleButtonComponent />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                Log in to manage your trades and portfolio.
            </Typography>

            {formError && (
                <Alert
                    severity="error"
                    variant="outlined"
                    onClose={() => setFormError('')}
                >
                    {formError}
                </Alert>
            )}

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
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />

                <Box display="flex" justifyContent="flex-end" mt={-1}>
                    <Link href={PATHS.auth.resetPassword.root} style={{ textDecoration: 'underline' }}>
                        <Typography variant="body2" color="primary">
                            Forgot password?
                        </Typography>
                    </Link>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            color="inherit"
                        />
                    ) : (
                        'Login'
                    )}
                </Button>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                    New here?{' '}
                    <Link href={PATHS.auth.register} style={{ textDecoration: 'underline' }}>
                        Create an account
                    </Link>
                </Typography>

            </Box>

        </Box>
    );
}
