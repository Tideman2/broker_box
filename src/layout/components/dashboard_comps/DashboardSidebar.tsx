'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    Drawer, List, Box, Typography, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoneyIcon from '@mui/icons-material/Money';
import TableChartIcon from '@mui/icons-material/TableChart';

import BrandLogo from '@/asset/logo';

import { PATHS } from '@/routes/paths';

import { useMediaQuery } from '@/layout/hook/useMediaQueries';

import SideBarItem from './SideBarItem';
import { ElitePlanCardLogout } from './components/ElitePlanCardLogout';

const SIDEBAR_ITEMS = [
    { label: 'Overview', href: PATHS.dashboard.root, icon: DashboardIcon },
    { label: 'Portfolio', href: PATHS.dashboard.portfolio, icon: AccountBalanceWalletIcon },
    { label: 'Trades', href: PATHS.dashboard.trades, icon: TableChartIcon },
    { label: 'Settings', href: PATHS.dashboard.settings, icon: SettingsIcon },
    { label: 'Deposit', href: PATHS.dashboard.deposit, icon: PaymentsIcon },
    { label: 'Withdraw', href: PATHS.dashboard.withdraw, icon: MoneyIcon },
    { label: 'Investment Plans', href: PATHS.dashboard.investmentplans, icon: TrendingUpIcon },
];

const SIDEBAR_WIDTH = 270;

const drawerPaperSx = {
    width: SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    bgcolor: 'background.paper',
    borderRight: '1px solid',
    borderColor: 'divider',
};

function SidebarContent() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pb: 2 }}>
                <BrandLogo width="32px" height="32px" />
                <Typography variant="subtitle1" fontWeight={700}>
                    Merchant Box
                </Typography>
            </Box>
            <Divider />
            <Typography
                variant="caption"
                sx={{ px: 3, pt: 2, pb: 1, color: 'text.secondary', letterSpacing: 1 }}
            >
                MENU
            </Typography>
            <List sx={{ px: 2, py: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {
                    SIDEBAR_ITEMS.map((item) => (
                        <SideBarItem
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            icon={item.icon}
                        />
                    ))
                }
            </List>

            {/* Elite plan card and log out button */}
            <ElitePlanCardLogout />
        </Box>
    );
}

type props = {
    mobileOpenProp: boolean;
    setMobileOpenProp: (open: boolean) => void;
}

export default function DashboardSidebar({ mobileOpenProp, setMobileOpenProp }: props) {
    const isMobile = useMediaQuery("upToSm");
    const pathname = usePathname();

    useEffect(() => {
        if (isMobile) {
            setMobileOpenProp(false);
        }
    }, [pathname, isMobile, setMobileOpenProp]);

    if (isMobile) {
        //mobile sidebar
        return (
            <>
                <Drawer
                    open={mobileOpenProp}
                    onClose={() => setMobileOpenProp(false)}
                    variant="temporary"
                    anchor="left"
                    transitionDuration={400}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    BackdropProps={{
                        sx: {
                            backdropFilter: 'blur(6px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        },
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            ...drawerPaperSx,
                            backdropFilter: 'blur(12px)',
                        },
                    }}
                >
                    <SidebarContent />
                </Drawer>
            </>
        )
    }

    //desktop sidebar
    return (
        <Drawer sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                ...drawerPaperSx,
            },
        }} variant="permanent" anchor="left">
            <SidebarContent />
        </Drawer>
    );
}