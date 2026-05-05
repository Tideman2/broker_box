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
    console.log(pathname, href)
    const isActive =
        pathname === href
    //  || pathname.startsWith(href + '/');

    return (
        <ListItemButton
            component={Link}
            href={href}
            selected={isActive}
            sx={{
                borderRadius: 2,
                mb: 0.5,

                '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: '0 0 10px rgba(0,214,255,0.5)',
                },
            }}
        >
            {Icon && (
                <ListItemIcon
                    sx={{
                        color: isActive ? 'inherit' : 'text.secondary',
                        minWidth: 36,
                    }}
                >
                    <Icon />
                </ListItemIcon>
            )}

            <ListItemText primary={label} />
        </ListItemButton>
    );
}