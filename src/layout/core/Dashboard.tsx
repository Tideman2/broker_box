'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import DashboardSidebar from '../components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <DashboardSidebar />
            <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
        </Box>
    );
}