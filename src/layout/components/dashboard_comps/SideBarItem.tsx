'use client';

import { usePathname } from 'next/navigation';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import Link from 'next/link';
import type { ElementType } from 'react';

type SideBarItemProps = {
    label: string;
    href: string;
    icon?: ElementType; // icon prop
};

export default function SideBarItem({
    label,
    href,
    icon: Icon,
}: SideBarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    //  || pathname.startsWith(href + '/');

    return (
        <ListItemButton
            component={Link}
            href={href}
            selected={isActive}
            sx={{
                position: 'relative',
                borderRadius: 1.5,
                mb: 1,
                px: 2,
                py: 1,
                color: 'text.secondary',
                '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    borderRadius: 999,
                    bgcolor: 'primary.main',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.2s',
                },
                '&:hover': {
                    bgcolor: 'action.hover',
                },
                '&.Mui-selected': {
                    bgcolor: 'action.selected',
                    color: 'primary.main',
                    '&:hover': {
                        bgcolor: 'action.selected',
                    },
                },
            }}
        >
            {Icon && (
                <ListItemIcon
                    sx={{
                        color: isActive ? 'primary.main' : 'text.secondary',
                        minWidth: 36,
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                >
                    <Icon fontSize="inherit" />
                </ListItemIcon>
            )}

            <ListItemText primary={label} />
        </ListItemButton>
    );
}