'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid, Stack } from '@mui/material';

import ContentWrapper from '@/layout/components/ContentWrapper';

import {
    getPortfolioHoldings,
    getPortfolioOverview,
    getPortfolioProfitLoss,
    getTrades,
} from '@/app/actions/portfolio-actions';
import { getSubscriptions } from '@/app/actions/subscription-actions';
import { getAvailableBalance } from '@/app/actions/deposit-actions';
import { getPlans } from '@/app/actions/plan-actions';
import { getMoneyFlow } from '@/app/actions/wallet-actions';
import {
    depositQueryKeys,
    planQueryKeys,
    portfolioQueryKeys,
    subscriptionQueryKeys,
    walletQueryKeys,
} from '@/api/react-query-keys';
import { ACTIVE_SUBSCRIPTION_STATUSES } from '@/views/dashboard/investment_plan/constants';
import { toNumber } from '@/utils/format';

import { marketSentimentData, portfolioAnalyticsData } from './mockData';

import PortfolioCommand from './components/PortfolioCommand';
import PortfolioStats from './components/PortfolioStats';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import TopInvestment from './components/TopInvestment';
import MarketSentiment from './components/MarketSentiment';
import RecentTrades from './components/RecentTrades';
import FinancialFlow from './components/FinancialFlow';
import DashboardFooter from './components/DashboardFooter';

import type { PortfolioStat } from './mockData';
import type { SubscriptionResponse } from '@/api/subscription/types';
import type { MoneyFlowItem } from '@/api/wallet/types';
import type { TradeResponse } from '@/api/portfolio/types';

/** Stable references so list props never change identity on render. */
const NO_TRADES: TradeResponse[] = [];
const NO_MONEY_FLOW: MoneyFlowItem[] = [];

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

    const recentTradesQuery = useQuery({
        queryKey: portfolioQueryKeys.recentTrades,
        queryFn: () => getTrades({ limit: 5, offset: 0 }),
        refetchOnWindowFocus: false,
    });

    const plansQuery = useQuery({
        queryKey: planQueryKeys.plans,
        queryFn: getPlans,
        refetchOnWindowFocus: false,
    });

    const moneyFlowQuery = useQuery({
        queryKey: walletQueryKeys.moneyFlow,
        queryFn: getMoneyFlow,
        refetchOnWindowFocus: false,
    });

    const topInvestment = useMemo(() => {
        const subscription = (
            subscriptionsQuery.data?.subscriptions ?? []
        )
            .filter((entry) =>
                ACTIVE_SUBSCRIPTION_STATUSES.includes(entry.status)
            )
            .reduce<SubscriptionResponse | null>(
                (best, entry) =>
                    best == null ||
                        Number(entry.invested_amount) > Number(best.invested_amount)
                        ? entry
                        : best,
                null
            );

        const plan =
            subscription != null
                ? plansQuery.data?.plans.find(
                    (entry) => entry.id === subscription.plan_id
                ) ?? null
                : null;

        return { subscription, plan };
    }, [subscriptionsQuery.data, plansQuery.data]);

    const activeInvestment = useMemo(
        () =>
            (subscriptionsQuery.data?.subscriptions ?? [])
                .filter((subscription) =>
                    ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status)
                )
                .reduce(
                    (sum, subscription) =>
                        sum + Number(subscription.invested_amount),
                    0
                ),
        [subscriptionsQuery.data]
    );

    const stats: PortfolioStat[] = useMemo(() => {
        const available = balanceQuery.data ?? 0;
        const holdingsValue = (holdingsQuery.data ?? []).reduce(
            (sum, holding) => sum + toNumber(holding.instrument_value),
            0
        );
        const totalPnl = profitLossQuery.data?.portfolio_total_profit_loss ?? 0;
        const portfolioValue = overviewQuery.data?.portfolio_value ?? 0;
        const changePct =
            portfolioValue > 0 ? (totalPnl / portfolioValue) * 100 : 0;

        return [
            { label: 'Total Balance', value: available + activeInvestment },
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
        activeInvestment,
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

                {/* <PortfolioAnalytics data={portfolioAnalyticsData} /> */}

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TopInvestment
                            subscription={topInvestment.subscription ?? undefined}
                            plan={topInvestment.plan ?? undefined}
                            loading={
                                subscriptionsQuery.isLoading || plansQuery.isLoading
                            }
                            error={
                                subscriptionsQuery.isError || plansQuery.isError
                            }
                            onRetry={() => {
                                subscriptionsQuery.refetch();
                                plansQuery.refetch();
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <MarketSentiment data={marketSentimentData} />
                    </Grid>
                </Grid>

                <RecentTrades
                    trades={recentTradesQuery.data ?? NO_TRADES}
                    loading={recentTradesQuery.isLoading}
                    error={recentTradesQuery.isError}
                    onRetry={() => recentTradesQuery.refetch()}
                />

                <FinancialFlow
                    moneyIn={moneyFlowQuery.data?.money_in ?? NO_MONEY_FLOW}
                    moneyOut={moneyFlowQuery.data?.money_out ?? NO_MONEY_FLOW}
                    balance={
                        balanceQuery.isSuccess && subscriptionsQuery.isSuccess
                            ? (balanceQuery.data ?? 0) + activeInvestment
                            : undefined
                    }
                    availableBalance={
                        balanceQuery.isSuccess
                            ? balanceQuery.data ?? 0
                            : undefined
                    }
                    loading={moneyFlowQuery.isLoading}
                    error={moneyFlowQuery.isError}
                    onRetry={() => moneyFlowQuery.refetch()}
                />

                <DashboardFooter />
            </Stack>
        </ContentWrapper>
    );
}
