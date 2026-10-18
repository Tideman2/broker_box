import type { ElementType, ReactNode } from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';
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
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                gap: 2,
                ...sx,
            }}
        >
            {(title || action) && (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
                        {Icon && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 32,
                                    height: 32,
                                    flexShrink: 0,
                                    borderRadius: '12px',
                                    backgroundColor: 'action.hover',
                                    color: 'primary.main',
                                }}
                            >
                                <Icon sx={{ fontSize: 20 }} />
                            </Box>
                        )}
                        {title && (
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, lineHeight: 1.4 }}
                            >
                                {title}
                            </Typography>
                        )}
                    </Stack>
                    {action}
                </Stack>
            )}
            {children}
        </Card>
    );
}
