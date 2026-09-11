import { Card, Chip, Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import type { PortfolioStat } from '@/views/dashboard/board/mockData';
import { formatCurrency, formatPercent } from '@/views/dashboard/board/utils';

type StatCardProps = {
    stat: PortfolioStat;
};

export default function StatCard({ stat }: StatCardProps) {
    const isUp = stat.trend === 'up';

    return (
        <Card sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                    {stat.label}
                </Typography>

                <Typography variant="h6">{formatCurrency(stat.value, 0)}</Typography>

                <Chip
                    size="small"
                    icon={
                        isUp ? (
                            <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                        ) : (
                            <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                        )
                    }
                    label={formatPercent(stat.changePct)}
                    sx={{
                        alignSelf: 'flex-start',
                        color: isUp ? 'success.main' : 'error.main',
                        bgcolor: 'transparent',
                        pl: 0,
                        '& .MuiChip-icon': {
                            color: isUp ? 'success.main' : 'error.main',
                        },
                    }}
                />
            </Stack>
        </Card>
    );
}