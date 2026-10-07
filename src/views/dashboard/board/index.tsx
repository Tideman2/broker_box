'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Stack } from '@mui/material';

import ContentWrapper from '@/layout/components/ContentWrapper';

import {
    getPortfolioHoldings,
    getPortfolioOverview,
    getPortfolioProfitLoss,
} from '@/app/actions/portfolio-actions';
import { getSubscriptions } from '@/app/actions/subscription-actions';
import { getAvailableBalance } from '@/app/actions/deposit-actions';
import {
    depositQueryKeys,
    portfolioQueryKeys,
    subscriptionQueryKeys,
} from '@/api/react-query-keys';
import { ACTIVE_SUBSCRIPTION_STATUSES } from '@/views/dashboard/investment_plan/constants';

import {
    activeStrategyData,
    financialFlowData,
    marketSentimentData,
    portfolioAnalyticsData,
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

import type { PortfolioStat } from './mockData';

export default function DashboardBoard() {
    const balanceQuery = useQuery({
        queryKey: depositQueryKeys.availableBalance,
        queryFn: getAvailableBalance,
        refetchOnWindowFocus: false,
    });

    const subscriptionsQuery = useQuery({
        queryKey: subscriptionQueryKeys.subscriptions,
        queryFn: getSubscriptions,
        refetchOnWindowFocus: false,
    });

    const holdingsQuery = useQuery({
        queryKey: portfolioQueryKeys.holdings,
        queryFn: getPortfolioHoldings,
        refetchOnWindowFocus: false,
    });

    const profitLossQuery = useQuery({
        queryKey: portfolioQueryKeys.profitLoss,
        queryFn: getPortfolioProfitLoss,
        refetchOnWindowFocus: false,
    });

    const overviewQuery = useQuery({
        queryKey: portfolioQueryKeys.overview,
        queryFn: getPortfolioOverview,
        refetchOnWindowFocus: false,
    });

    const stats: PortfolioStat[] = useMemo(() => {
        const available = balanceQuery.data ?? 0;
        const invested = (subscriptionsQuery.data?.subscriptions ?? [])
            .filter((subscription) =>
                ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status)
            )
            .reduce(
                (sum, subscription) => sum + Number(subscription.invested_amount),
                0
            );
        const holdingsValue = (holdingsQuery.data ?? []).reduce(
            (sum, holding) => sum + holding.instrument_value,
            0
        );
        const totalPnl = profitLossQuery.data?.portfolio_total_profit_loss ?? 0;
        const portfolioValue = overviewQuery.data?.portfolio_value ?? 0;
        const changePct =
            portfolioValue > 0 ? (totalPnl / portfolioValue) * 100 : 0;

        return [
            { label: 'Total Balance', value: available + invested },
            { label: 'Active Investment', value: holdingsValue },
            {
                label: 'Profit / Loss',
                value: totalPnl,
                changePct,
                trend: totalPnl >= 0 ? 'up' : 'down',
            },
            { label: 'Available Balance', value: available },
        ];
    }, [
        balanceQuery.data,
        subscriptionsQuery.data,
        holdingsQuery.data,
        profitLossQuery.data,
        overviewQuery.data,
    ]);

    const statsLoading =
        balanceQuery.isLoading ||
        subscriptionsQuery.isLoading ||
        holdingsQuery.isLoading ||
        profitLossQuery.isLoading ||
        overviewQuery.isLoading;

    const statsError =
        balanceQuery.isError ||
        subscriptionsQuery.isError ||
        holdingsQuery.isError ||
        profitLossQuery.isError ||
        overviewQuery.isError;

    const retryStats = () => {
        balanceQuery.refetch();
        subscriptionsQuery.refetch();
        holdingsQuery.refetch();
        profitLossQuery.refetch();
        overviewQuery.refetch();
    };

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <PortfolioCommand />

                <PortfolioStats
                    stats={stats}
                    loading={statsLoading}
                    error={statsError}
                    onRetry={retryStats}
                />

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
