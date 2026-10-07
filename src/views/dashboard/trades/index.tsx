"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import {
    getTrades,
    getTradesOverview,
} from "@/app/actions/portfolio-actions";
import { getAssets } from "@/app/actions/deposit-actions";
import { depositQueryKeys, portfolioQueryKeys } from "@/api/react-query-keys";
import { downloadCsv } from "@/views/dashboard/portfolio/utils";

import { TRADES_PAGE_LIMIT } from "./constants";
import { TRADES_CONTENT } from "./mockContent";
import { buildTradesCsv, matchesSearch, resolveEmptyMode } from "./utils";

import TradesHeader from "./components/TradesHeader";
import TradesStats from "./components/TradesStats";
import TradesToolbar from "./components/TradesToolbar";
import TradesTable from "./components/TradesTable";

import type { TradesEmptyMode } from "./constants";
import type { TradeResponse, TradeType } from "@/api/portfolio/types";

/** Stable reference so `pageTrades` does not change identity on every render. */
const NO_TRADES: TradeResponse[] = [];

export default function Trades() {
    const [search, setSearch] = useState("");
    const [instrumentId, setInstrumentId] = useState<number | null>(null);
    const [tradeType, setTradeType] = useState<TradeType | null>(null);
    const [days, setDays] = useState<number | null>(null);
    const [page, setPage] = useState(0);

    const assetsQuery = useQuery({
        queryKey: depositQueryKeys.assets,
        queryFn: getAssets,
        refetchOnWindowFocus: false,
    });

    const overviewQuery = useQuery({
        queryKey: portfolioQueryKeys.tradesOverview,
        queryFn: getTradesOverview,
        refetchOnWindowFocus: false,
    });

    const tradesQuery = useQuery({
        queryKey: [
            ...portfolioQueryKeys.trades,
            instrumentId,
            tradeType,
            days,
            page,
        ],
        queryFn: async () => {
            const offset = page * TRADES_PAGE_LIMIT;
            const rows = await getTrades({
                ...(instrumentId != null && { instrument_id: instrumentId }),
                ...(tradeType != null && { type: tradeType }),
                ...(days != null && { days }),
                limit: TRADES_PAGE_LIMIT,
                offset,
            });

            // The offset travels with the rows so `placeholderData` can never
            // label one page's data with another page's numbering.
            return { offset, rows };
        },
        refetchOnWindowFocus: false,
        placeholderData: (previous) => previous,
    });

    const pageTrades = tradesQuery.data?.rows ?? NO_TRADES;
    const baseOffset = tradesQuery.data?.offset ?? page * TRADES_PAGE_LIMIT;
    const shownPage = Math.floor(baseOffset / TRADES_PAGE_LIMIT);

    const rows = useMemo(
        () => pageTrades.filter((trade) => matchesSearch(trade, search)),
        [pageTrades, search]
    );

    const hasServerFilters =
        instrumentId != null || tradeType != null || days != null;
    const hasFilters = hasServerFilters || search.trim() !== "";

    const emptyMode: TradesEmptyMode = resolveEmptyMode(
        rows.length,
        pageTrades.length,
        hasServerFilters
    );

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(0);
    };

    const handleInstrumentChange = (value: number | null) => {
        setInstrumentId(value);
        setPage(0);
    };

    const handleTradeTypeChange = (value: TradeType | null) => {
        setTradeType(value);
        setPage(0);
    };

    const handleDaysChange = (value: number | null) => {
        setDays(value);
        setPage(0);
    };

    const handleClearFilters = () => {
        setSearch("");
        setInstrumentId(null);
        setTradeType(null);
        setDays(null);
        setPage(0);
    };

    const handleExport = () =>
        downloadCsv(TRADES_CONTENT.exportFilename, buildTradesCsv(rows));

    const handleRetry = () => {
        overviewQuery.refetch();
        tradesQuery.refetch();
    };

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <TradesHeader
                    onExport={handleExport}
                    exportDisabled={rows.length === 0}
                />

                <TradesStats
                    overview={overviewQuery.data}
                    loading={overviewQuery.isLoading}
                    error={overviewQuery.isError}
                    onRetry={handleRetry}
                />

                <TradesToolbar
                    search={search}
                    onSearchChange={handleSearchChange}
                    assets={assetsQuery.data ?? []}
                    instrumentId={instrumentId}
                    onInstrumentChange={handleInstrumentChange}
                    tradeType={tradeType}
                    onTradeTypeChange={handleTradeTypeChange}
                    days={days}
                    onDaysChange={handleDaysChange}
                    hasFilters={hasFilters}
                    onClearFilters={handleClearFilters}
                />

                <TradesTable
                    rows={rows}
                    page={shownPage}
                    showingFrom={rows.length > 0 ? baseOffset + 1 : 0}
                    showingTo={baseOffset + rows.length}
                    hasPrevPage={shownPage > 0}
                    hasNextPage={pageTrades.length === TRADES_PAGE_LIMIT}
                    onPrevPage={() => setPage((current) => Math.max(0, current - 1))}
                    onNextPage={() => setPage((current) => current + 1)}
                    emptyMode={emptyMode}
                    loading={tradesQuery.isLoading}
                    error={tradesQuery.isError}
                    onRetry={handleRetry}
                />
            </Stack>
        </ContentWrapper>
    );
}