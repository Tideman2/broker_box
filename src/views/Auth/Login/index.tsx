'use client';

import { useState } from 'react';

import {
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At least 8 characters, one uppercase letter, one lowercase letter,
// and one number.
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });


    const validate = () => {

        const newErrors = {
            email: '',
            password: '',
        };


        if (!EMAIL_REGEX.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }


        if (!PASSWORD_REGEX.test(password)) {
            newErrors.password =
                'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number.';
        }


        setErrors(newErrors);

        return !newErrors.email && !newErrors.password;
    };


    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        console.log({
            email,
            password,
        });
    };


    return (

        <Box
            component="form"
            onSubmit={handleSubmit}
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={2}
            sx={{
                px: 2,
            }}
        >
            <ThemeToggleButtonComponent />
            <Typography variant="h4">
                Login
            </Typography>


            <Box
                width="100%"
                maxWidth={400}
                display="flex"
                flexDirection="column"
                gap={2}
            >

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
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
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />


                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Login
                </Button>

            </Box>

        </Box>
    );
}