import { Button, Grid } from '@mui/material';

import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';

import type { PortfolioStat } from '@/views/dashboard/board/mockData';

import StatCard from './components/StatCard';

type PortfolioStatsProps = {
    stats: PortfolioStat[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PortfolioStats({
    stats,
    loading,
    error,
    onRetry,
}: PortfolioStatsProps) {
    if (loading) {
        return (
            <Grid container spacing={3}>
                {[0, 1, 2, 3].map((index) => (
                    <Grid key={index} size={{ xs: 6, md: 3 }}>
                        <LoadingState height={88} lines={2} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <EmptyState
                        title="Portfolio statistics unavailable"
                        description="We could not load your portfolio numbers."
                        action={
                            <Button size="small" variant="outlined" onClick={onRetry}>
                                Retry
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {stats.map((stat) => (
                <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                    <StatCard stat={stat} />
                </Grid>
            ))}
        </Grid>
    );
}
