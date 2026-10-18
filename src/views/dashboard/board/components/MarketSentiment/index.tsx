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
                        size="small"
                        sx={{
                            color: SENTIMENT_COLOR[data.sentiment],
                            border: '1px solid',
                            borderColor: SENTIMENT_COLOR[data.sentiment],
                            bgcolor: 'transparent',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            fontWeight: 600,
                        }}
                    />
                    <Stack direction="row" alignItems="baseline" spacing={0.5}>
                        <Typography
                            variant="h4"
                            sx={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            {data.score}
                        </Typography>
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
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                                >
                                    {item.value}%
                                </Typography>
                            </Stack>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 3,
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