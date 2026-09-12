'use client';

import { Grid, Stack } from '@mui/material';

import ContentWrapper from '@/layout/components/ContentWrapper';

import {
    activeStrategyData,
    financialFlowData,
    marketSentimentData,
    portfolioAnalyticsData,
    portfolioStatsData,
    recentTradesData,
} from './mockData';

import PortfolioCommand from './components/PortfolioCommand';
import PortfolioStats from './components/PortfolioStats';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import ActiveStrategy from './components/ActiveStrategy';
import MarketSentiment from './components/MarketSentiment';
import RecentTrades from './components/RecentTrades';
import FinancialFlow from './components/FinancialFlow';
import DashboardFooter from './components/DashboardFooter';

export default function DashboardBoard() {
    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <PortfolioCommand />

                <PortfolioStats stats={portfolioStatsData} />

                <PortfolioAnalytics data={portfolioAnalyticsData} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ActiveStrategy data={activeStrategyData} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <MarketSentiment data={marketSentimentData} />
                    </Grid>
                </Grid>

                <RecentTrades trades={recentTradesData} />

                <FinancialFlow data={financialFlowData} />

                <DashboardFooter />
            </Stack>
        </ContentWrapper>
    );
}