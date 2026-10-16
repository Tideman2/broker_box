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
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Sidebar */}
            <DashboardSidebar mobileOpenProp={mobileOpen} setMobileOpenProp={setMobileOpen} />

            {/* Main Area */}
            <Box sx={{ flex: 1, display: 'flex', minWidth: 0, ml: isMobile ? 0 : "270px", flexDirection: 'column' }}>
                {/* Navbar */}
                <DashboardNavbar setMobileOpen={setMobileOpen} />

                {/* Page Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        width: '100%',
                        maxWidth: 1280,
                        mx: 'auto',
                        p: { xs: 2, md: 3 },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}