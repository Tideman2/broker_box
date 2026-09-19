"use client";

import { useQuery } from "@tanstack/react-query";
import { Grid, Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import {
    getPortfolioHoldings,
    getPortfolioOverview,
    getPortfolioProfitLoss,
} from "@/app/actions/portfolio-actions";
import { portfolioQueryKeys } from "@/api/react-query-keys";

import { performanceByInstrument } from "./utils";

import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioStats from "./components/PortfolioStats";
import AssetAllocation from "./components/AssetAllocation";
import PerformanceGrowth from "./components/PerformanceGrowth";
import HoldingsTable from "./components/HoldingsTable";

export default function Portfolio() {
    const overviewQuery = useQuery({
        queryKey: portfolioQueryKeys.overview,
        queryFn: getPortfolioOverview,
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

    const loading =
        overviewQuery.isLoading || holdingsQuery.isLoading || profitLossQuery.isLoading;

    const error =
        overviewQuery.isError || holdingsQuery.isError || profitLossQuery.isError;

    const retry = () => {
        overviewQuery.refetch();
        holdingsQuery.refetch();
        profitLossQuery.refetch();
    };

    const sectionProps = { loading, error, onRetry: retry };

    const lastUpdated = Math.max(
        overviewQuery.dataUpdatedAt,
        holdingsQuery.dataUpdatedAt,
        profitLossQuery.dataUpdatedAt
    );

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <PortfolioHeader />

                <PortfolioStats
                    overview={overviewQuery.data}
                    profitLoss={profitLossQuery.data}
                    {...sectionProps}
                />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AssetAllocation
                            items={overviewQuery.data?.asset_allocation}
                            totalValue={overviewQuery.data?.portfolio_value}
                            {...sectionProps}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <PerformanceGrowth {...sectionProps} />
                    </Grid>
                </Grid>

                <HoldingsTable
                    holdings={holdingsQuery.data}
                    performance={performanceByInstrument(
                        profitLossQuery.data?.instruments ?? []
                    )}
                    lastUpdated={lastUpdated}
                    {...sectionProps}
                />
            </Stack>
        </ContentWrapper>
    );
}