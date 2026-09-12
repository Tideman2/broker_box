import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';

import DashboardCard from '@/components/DashboardCard';

import type { MarketSentimentData } from '@/views/dashboard/board/mockData';

const SENTIMENT_COLOR: Record<
    MarketSentimentData['sentiment'],
    string
> = {
    Bullish: 'success.main',
    Bearish: 'error.main',
    Neutral: 'warning.main',
};

const BREAKDOWN_COLOR = (label: string): string => {
    if (label === 'Bullish') return 'success.main';
    if (label === 'Bearish') return 'error.main';
    return 'warning.main';
};

type MarketSentimentProps = {
    data: MarketSentimentData;
};

export default function MarketSentiment({ data }: MarketSentimentProps) {
    return (
        <DashboardCard title="Market Sentiment" icon={InsightsIcon}>
            <Stack spacing={2}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Chip
                        label={data.sentiment}
                        sx={{
                            color: SENTIMENT_COLOR[data.sentiment],
                            border: '1px solid',
                            borderColor: SENTIMENT_COLOR[data.sentiment],
                            bgcolor: 'transparent',
                        }}
                    />
                    <Stack direction="row" alignItems="baseline" spacing={0.5}>
                        <Typography variant="h4">{data.score}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            /100
                        </Typography>
                    </Stack>
                </Stack>

                <Stack spacing={1.5}>
                    {data.breakdown.map((item) => (
                        <Box key={item.label}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={0.5}
                            >
                                <Typography variant="caption" color="text.secondary">
                                    {item.label}
                                </Typography>
                                <Typography variant="caption">
                                    {item.value}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{
                                    height: 4,
                                    borderRadius: 2,
                                    bgcolor: 'divider',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 2,
                                        backgroundColor: BREAKDOWN_COLOR(item.label),
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </DashboardCard>
    );
}