import { Grid } from '@mui/material';

import type { PortfolioStat } from '@/views/dashboard/board/mockData';

import StatCard from './components/StatCard';

type PortfolioStatsProps = {
    stats: PortfolioStat[];
};

export default function PortfolioStats({ stats }: PortfolioStatsProps) {
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