'use client';

import { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { marketplace } from '@/components/exports'

type Props = {
    children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                bgcolor: 'background.default',
            }}
        >
            {/* LEFT SIDE (Image / Visual) */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'flex' }, // ❗ hidden on mobile
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                }}
            >
                {/* Background image */}
                <Box
                    component="img"
                    src={marketplace.src} // change this
                    alt="auth visual"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // opacity: 0.25,
                    }}
                />

                {/* Glow overlay (matches your theme) */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        filter: 'blur(120px)',
                        opacity: 0.3,
                    }}
                />
            </Box>

            {/* RIGHT SIDE (Forms) */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2, sm: 4 },
                    py: { xs: 4, md: 6 },
                }}
            >
                {/* Centered card */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 440,
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 3,
                        px: { xs: 3, sm: 4 },
                        py: 4,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    }}
                >
                    <Stack spacing={2.5} sx={{ width: '100%' }}>
                        {children}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}