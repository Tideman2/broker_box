"use client";

import { useMemo } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SpeedIcon from "@mui/icons-material/Speed";

import { formatCurrency } from "@/utils/format";
import { diversificationStatusColor, riskLabelFromScore } from "../../utils";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import StatCard from "./components/StatCard";
import type { KpiStat } from "./components/StatCard";

import type {
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
} from "@/api/portfolio/types";

type PortfolioStatsProps = {
    overview?: PortfolioOverviewResponse;
    profitLoss?: PortfolioProfitLossResponse;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PortfolioStats({
    overview,
    profitLoss,
    loading,
    error,
    onRetry,
}: PortfolioStatsProps) {
    const stats: KpiStat[] = useMemo(() => {
        const portfolioValue = overview?.portfolio_value ?? 0;
        const realized = profitLoss?.portfolio_realized_profit ?? 0;
        const unrealized = profitLoss?.portfolio_unrealized_profit ?? 0;
        const totalPnl = profitLoss?.portfolio_total_profit_loss ?? 0;
        const totalPnlIsUp = totalPnl >= 0;
        const changePct =
            portfolioValue > 0 ? (totalPnl / portfolioValue) * 100 : 0;
        const riskScore = Number(overview?.portfolio_risk_score ?? 0);
        const diversificationLabel = overview?.diversification_score ?? "";

        return [
            {
                id: "value",
                label: "Total Portfolio Value",
                value: formatCurrency(portfolioValue, 0),
                icon: AccountBalanceWalletIcon,
                trend: totalPnlIsUp ? "up" : "down",
                changePct,
                caption: "Across all linked strategies",
            },
            {
                id: "pl",
                label: "Profit / Loss",
                value: formatCurrency(totalPnl, 0),
                icon: TrendingUpIcon,
                trend: totalPnlIsUp ? "up" : "down",
                caption: `Realized ${formatCurrency(realized)} · Unrealized ${formatCurrency(unrealized)}`,
            },
            {
                id: "diversification",
                label: "Diversification Score",
                value: diversificationLabel
                    ? diversificationLabel.charAt(0).toUpperCase() +
                    diversificationLabel.slice(1).toLowerCase()
                    : "—",
                icon: DonutSmallIcon,
                status: diversificationLabel
                    ? diversificationStatusColor(diversificationLabel)
                    : "neutral",
                statusLabel:
                    diversificationLabel.charAt(0).toUpperCase() +
                    diversificationLabel.slice(1).toLowerCase(),
                caption: "Weight across categories",
            },
            {
                id: "risk",
                label: "Risk Appetite",
                value: riskLabelFromScore(riskScore),
                icon: SpeedIcon,
                status: "neutral",
                statusLabel: riskLabelFromScore(riskScore),
                caption: `Risk score ${riskScore.toFixed(2)}`,
            },
        ];
    }, [overview, profitLoss]);

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
                <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
                    <Tooltip title={stat.statusLabel ?? ""} placement="top">
                        <span style={{ display: "block", height: "100%" }}>
                            <StatCard stat={stat} />
                        </span>
                    </Tooltip>
                </Grid>
            ))}
        </Grid>
    );
}
