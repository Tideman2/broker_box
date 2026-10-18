import { Card, Chip, Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import type { PortfolioStat } from '@/views/dashboard/board/mockData';
import { formatPercent } from '@/views/dashboard/board/utils';
import { useFormatCurrency } from "@/contexts/currency/hooks";

type StatCardProps = {
    stat: PortfolioStat;
};

export default function StatCard({ stat }: StatCardProps) {
    const { formatCurrency } = useFormatCurrency();
    const isUp = stat.trend === 'up';

    return (
        <Card sx={{ p: 2, height: '100%' }}>
            <Stack spacing={1}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                    }}
                >
                    {stat.label}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                >
                    {formatCurrency(stat.value, 0)}
                </Typography>

                {stat.changePct != null && (
                    <Chip
                        size="small"
                        color={isUp ? 'success' : 'error'}
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
                            fontWeight: 600,
                            '& .MuiChip-icon': { fontSize: 14 },
                        }}
                    />
                )}
            </Stack>
        </Card>
    );
}