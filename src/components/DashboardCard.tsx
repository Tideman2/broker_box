import type { ElementType, ReactNode } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

type DashboardCardProps = {
    icon?: ElementType;
    title?: string;
    action?: ReactNode;
    children: ReactNode;
    sx?: SxProps<Theme>;
};

export default function DashboardCard({
    icon: Icon,
    title,
    action,
    children,
    sx,
}: DashboardCardProps) {
    return (
        <Card sx={{ height: '100%', p: { xs: 2, md: 3 }, ...sx }}>
            {(title || action) && (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    mb={2}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {Icon && <Icon sx={{ color: 'primary.main', fontSize: 22 }} />}
                        {title && <Typography variant="h6">{title}</Typography>}
                    </Stack>
                    {action}
                </Stack>
            )}
            {children}
        </Card>
    );
}