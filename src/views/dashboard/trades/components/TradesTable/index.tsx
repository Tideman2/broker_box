"use client";

import {
    Button,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import DashboardCard from "@/components/DashboardCard";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import { TRADE_HEAD_CELLS } from "../../constants";
import { TRADES_CONTENT } from "../../mockContent";

import TradeRow from "./components/TradeRow";

import type { TradesEmptyMode } from "../../constants";
import type { TradeResponse } from "@/api/portfolio/types";

const EMPTY_COPY: Record<TradesEmptyMode, { title: string; description: string }> =
    {
        "no-trades": {
            title: TRADES_CONTENT.empty.noTradesTitle,
            description: TRADES_CONTENT.empty.noTradesDescription,
        },
        "no-matches": {
            title: TRADES_CONTENT.empty.noMatchesTitle,
            description: TRADES_CONTENT.empty.noMatchesDescription,
        },
        "no-filter-matches": {
            title: TRADES_CONTENT.empty.noFilterMatchesTitle,
            description: TRADES_CONTENT.empty.noFilterMatchesDescription,
        },
    };

type TradesTableProps = {
    rows: TradeResponse[];
    page: number;
    showingFrom: number;
    showingTo: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    onPrevPage: () => void;
    onNextPage: () => void;
    emptyMode?: TradesEmptyMode;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function TradesTable({
    rows,
    page,
    showingFrom,
    showingTo,
    hasPrevPage,
    hasNextPage,
    onPrevPage,
    onNextPage,
    emptyMode,
    loading,
    error,
    onRetry,
}: TradesTableProps) {
    return (
        <DashboardCard title={TRADES_CONTENT.tableTitle} icon={ReceiptLongIcon}>
            {loading ? (
                <LoadingState height={40} lines={6} />
            ) : error ? (
                <EmptyState
                    title={TRADES_CONTENT.errors.tableTitle}
                    description={TRADES_CONTENT.errors.tableDescription}
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            {TRADES_CONTENT.errors.retry}
                        </Button>
                    }
                />
            ) : rows.length === 0 ? (
                <EmptyState
                    icon={ReceiptLongIcon}
                    title={EMPTY_COPY[emptyMode ?? "no-trades"].title}
                    description={EMPTY_COPY[emptyMode ?? "no-trades"].description}
                />
            ) : (
                <>
                    <TableContainer sx={{ mx: { xs: -2, md: -3 }, width: "auto" }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {TRADE_HEAD_CELLS.map((cell, index) => (
                                        <TableCell
                                            key={cell}
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: "0.75rem",
                                                textTransform: "uppercase",
                                                display:
                                                    index === 2
                                                        ? { xs: "none", sm: "table-cell" }
                                                        : index === 3
                                                          ? { xs: "none", md: "table-cell" }
                                                          : undefined,
                                            }}
                                        >
                                            {cell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((trade) => (
                                    <TradeRow
                                        key={trade.transaction_id}
                                        trade={trade}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "stretch", sm: "center" }}
                        spacing={2}
                        mt={2}
                    >
                        <Typography variant="caption" color="text.secondary">
                            {showingFrom > 0 &&
                                `${TRADES_CONTENT.showingRange} ${showingFrom} ${TRADES_CONTENT.showingOf} ${showingTo}`}
                            {" · "}
                            {TRADES_CONTENT.pageLabel} {page + 1}
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<ChevronLeftIcon />}
                                onClick={onPrevPage}
                                disabled={!hasPrevPage}
                            >
                                {TRADES_CONTENT.prev}
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                endIcon={<ChevronRightIcon />}
                                onClick={onNextPage}
                                disabled={!hasNextPage}
                            >
                                {TRADES_CONTENT.next}
                            </Button>
                        </Stack>
                    </Stack>
                </>
            )}
        </DashboardCard>
    );
}