'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

import Navbar from '../components/main/Nav';
import Footer from '../components/main/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <Box
            width="100%"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default',
                // Reserve room for the fixed 60px TradingView ticker + 24px breathing space.
                pb: '84px',
            }}
        >
            <Navbar />
            <Box component="main" sx={{ flex: 1, width: '100%' }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}