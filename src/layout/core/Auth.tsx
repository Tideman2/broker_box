'use client';

import { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { marketplace, rockets } from '@/components/exports'

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
                    px: 3,
                    py: 6,
                }}
            >
                {/* Content Wrapper */}
                <Stack
                    spacing={3}
                    sx={{
                        width: '100%',
                        maxWidth: 420, // keeps form nice and tight
                    }}
                >
                    {children}
                </Stack>
            </Box>
        </Box>
    );
}