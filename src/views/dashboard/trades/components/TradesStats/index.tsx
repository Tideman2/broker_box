"use client";

import type { ElementType } from "react";
import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PercentIcon from "@mui/icons-material/Percent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import { formatAmount, toNumber } from "@/utils/format";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import { TRADES_CONTENT } from "../../mockContent";
import { winRatePercent } from "../../utils";

import type { TradeOverviewResponse } from "@/api/portfolio/types";

type TradeStat = {
    id: string;
    label: string;
    value: string;
    icon: ElementType;
    caption: string;
    color?: string;
};

type TradesStatsProps = {
    overview?: TradeOverviewResponse;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function TradesStats({
    overview,
    loading,
    error,
    onRetry,
}: TradesStatsProps) {
    if (loading) {
        return (
            <Grid container spacing={3}>
                {[0, 1, 2].map((index) => (
                    <Grid key={index} size={{ xs: 12, sm: 4 }}>
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
                        title={TRADES_CONTENT.errors.statsTitle}
                        description={TRADES_CONTENT.errors.statsDescription}
                        action={
                            <Button size="small" variant="outlined" onClick={onRetry}>
                                {TRADES_CONTENT.errors.retry}
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        );
    }

    const netProfit = toNumber(overview?.total_net_profit);
    const isProfitUp = netProfit >= 0;

    const stats: TradeStat[] = [
        {
            id: "total",
            label: TRADES_CONTENT.stats.totalTrades,
            value: (overview?.total_trades ?? 0).toLocaleString("en-US"),
            icon: SwapHorizIcon,
            caption: TRADES_CONTENT.stats.totalTradesCaption,
        },
        {
            id: "winRate",
            label: TRADES_CONTENT.stats.winRate,
            value: winRatePercent(overview?.win_rate ?? "0"),
            icon: PercentIcon,
            caption: TRADES_CONTENT.stats.winRateCaption,
        },
        {
            id: "netProfit",
            label: TRADES_CONTENT.stats.netProfit,
            value: formatAmount(netProfit),
            icon: isProfitUp ? TrendingUpIcon : TrendingDownIcon,
            caption: TRADES_CONTENT.stats.netProfitCaption,
            color: isProfitUp ? "success.main" : "error.main",
        },
    ];

    return (
        <Grid container spacing={3}>
            {stats.map((stat) => (
                <Grid key={stat.id} size={{ xs: 12, sm: 4 }}>
                    <Card sx={{ p: 2, height: "100%" }}>
                        <Stack spacing={1}>
                            <stat.icon
                                sx={{
                                    color: stat.color ?? "primary.main",
                                    fontSize: 22,
                                }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {stat.label}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={stat.color ? { color: stat.color } : undefined}
                            >
                                {stat.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {stat.caption}
                            </Typography>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}