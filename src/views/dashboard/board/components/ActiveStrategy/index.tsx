import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import DashboardCard from '@/components/DashboardCard';

import type { ActiveStrategyData } from '@/views/dashboard/board/mockData';
import { formatCurrency, formatPercent } from '@/views/dashboard/board/utils';

type ActiveStrategyProps = {
    data: ActiveStrategyData;
};

export default function ActiveStrategy({ data }: ActiveStrategyProps) {
    const isUp = data.changePct >= 0;

    return (
        <DashboardCard
            title="Active Strategy"
            icon={TrendingUpIcon}
        >
            <Stack spacing={2}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Typography variant="subtitle1">{data.market}</Typography>
                    <Chip
                        label={data.strategy}
                        size="small"
                        sx={{
                            color: 'secondary.main',
                            border: '1px solid',
                            borderColor: 'secondary.main',
                            bgcolor: 'transparent',
                        }}
                    />
                </Stack>

                <Stack direction="row" spacing={4}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Invested
                        </Typography>
                        <Typography variant="body2">
                            {formatCurrency(data.invested, 0)}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Current Value
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6">
                                {formatCurrency(data.currentValue, 0)}
                            </Typography>
                            <Typography
                                variant="caption"
                                color={isUp ? 'success.main' : 'error.main'}
                            >
                                {formatPercent(data.changePct)}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

                <Box>
                    <LinearProgress
                        variant="determinate"
                        value={data.progress}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'divider',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                background: 'linear-gradient(90deg, #00D6FF, #8C5CFF)',
                            },
                        }}
                    />
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                        {data.progress}% of growth target reached
                    </Typography>
                </Box>
            </Stack>
        </DashboardCard>
    );
}