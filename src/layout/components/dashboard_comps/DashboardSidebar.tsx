'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    Drawer, List
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoneyIcon from '@mui/icons-material/Money';

import { PATHS } from '@/routes/paths';

import { useMediaQuery } from '@/layout/hook/useMediaQueries';

import SideBarItem from './SideBarItem';
import { ElitePlanCardLogout } from './components/ElitePlanCardLogout';

const SIDEBAR_ITEMS = [
    { label: 'Overview', href: PATHS.dashboard.root, icon: DashboardIcon },
    { label: 'Markets', href: PATHS.dashboard.markets, icon: ShowChartIcon },
    { label: 'Portfolio', href: PATHS.dashboard.portfolio, icon: AccountBalanceWalletIcon },
    { label: 'Settings', href: PATHS.dashboard.settings, icon: SettingsIcon },
    { label: 'Deposit', href: PATHS.dashboard.deposit, icon: PaymentsIcon },
    { label: 'Withdraw', href: PATHS.dashboard.withdraw, icon: MoneyIcon },
    { label: 'Investment Plans', href: PATHS.dashboard.investmentplans, icon: TrendingUpIcon },
];

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
                        },
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 270,
                            boxSizing: 'border-box',
                            backdropFilter: 'blur(12px)',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                >
                    <List sx={{ p: 2 }}>
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
                </Drawer>
            </>
        )
    }

    //desktop sidebar
    return (
        <Drawer sx={{
            '& .MuiDrawer-paper': {
                width: 270,
                boxSizing: 'border-box',
            },
        }} variant="permanent" anchor="left">
            {/* <Stack p={2} direction={"row"} alignItems="center" justifyContent="center">
                <BrandLogo width={"50px"} height={"50px"} />
                <Typography variant="caption">
                    Merchant Box
                </Typography>
            </Stack> */}
            <List sx={{ p: 2 }}>
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
        </Drawer>
    );
}