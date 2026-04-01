'use client';

import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

import { PATHS } from '@/routes/paths';

export default function DashboardSidebar() {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItemButton component={Link} href={PATHS.dashboard.root}>
                    <ListItemText primary="Overview" />
                </ListItemButton>
                <ListItemButton component={Link} href={PATHS.dashboard.markets}>
                    <ListItemText primary="Markets" />
                </ListItemButton>
                <ListItemButton component={Link} href={PATHS.dashboard.portfolio}>
                    <ListItemText primary="Portfolio" />
                </ListItemButton>
                <ListItemButton component={Link} href={PATHS.dashboard.settings}>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </Drawer>
    );
}