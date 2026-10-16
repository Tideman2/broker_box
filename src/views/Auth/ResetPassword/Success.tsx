'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { alpha } from '@mui/material/styles';

import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import { PATHS } from '@/routes/paths';

export default function ResetPasswordSuccess() {
    const router = useRouter();

    return (
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', width: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%' }}>
                <ThemeToggleButtonComponent />
            </Stack>

            <Box
                sx={(theme) => ({
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(theme.palette.success.main, 0.12),
                })}
            >
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
            </Box>

            <Typography variant="h4">Password reset</Typography>
            <Typography variant="body2" color="text.secondary">
                Your password has been updated successfully. You can now sign in
                with your new password.
            </Typography>

            <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => router.push(PATHS.auth.login)}
            >
                Back to login
            </Button>
        </Stack>
    );
}
