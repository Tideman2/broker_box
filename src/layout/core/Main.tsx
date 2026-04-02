'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

import Navbar from '../components/main/Nav';
import Footer from '../components/main/Footer';
import TradingViewTicker2 from '@/views/trading-view-widgets/TradingViewTicker2';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <Box width={"100vw"} pb={8}>
            <Navbar />
            {children}
            <TradingViewTicker2 />
            <Footer />
        </Box>
    );
}