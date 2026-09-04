'use client';

import { ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { useMediaQuery } from '../hook/useMediaQueries';

import DashboardSidebar from '../components/dashboard_comps/DashboardSidebar';
import DashboardNavbar from '../components/dashboard_comps/DashboardNavbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const isMobile = useMediaQuery("upToSm");
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <DashboardSidebar mobileOpenProp={mobileOpen} setMobileOpenProp={setMobileOpen} />

            {/* Main Area */}
            <Box sx={{ flex: 1, display: 'flex', ml: isMobile ? 0 : "270px", flexDirection: 'column' }}>
                {/* Navbar */}
                <DashboardNavbar setMobileOpen={setMobileOpen} />

                {/* Page Content */}
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}