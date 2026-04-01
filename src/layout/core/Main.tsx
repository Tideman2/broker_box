'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

import Navbar from '../components/Nav';


export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Navbar />
            <Box sx={{ mt: 4 }}>{children}</Box>
        </Box>
    );
}