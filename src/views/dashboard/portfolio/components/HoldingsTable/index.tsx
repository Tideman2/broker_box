"use client";

import { useMemo, useState } from "react";
import {
    Button,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import TableChartIcon from "@mui/icons-material/TableChart";

import DashboardCard from "@/components/DashboardCard";
import {
    amountWithUnit,
    buildHoldingsCsv,
    downloadCsv,
    timeAgo,
} from "../../utils";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import HoldingsRow from "./components/HoldingsRow";

import type { HoldingsRow as HoldingsRowData } from "../../utils";
import type { HoldingResponse } from "@/api/portfolio/types";

const HEAD_CELLS = [
    "Asset",
    "Category",
    "Amount",
    "Current Price",
    "Total Value",
    "Performance",
    "Actions",
];

type HoldingsTableProps = {
    holdings?: HoldingResponse[];
    performance?: Map<number, number>;
    lastUpdated?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function HoldingsTable({
    holdings = [],
    performance = new Map<number, number>(),
    lastUpdated,
    loading,
    error,
    onRetry,
}: HoldingsTableProps) {
    const [search, setSearch] = useState("");

    const rows: HoldingsRowData[] = useMemo(
        () =>
            holdings.map((holding) => ({
                ...holding,
                amount: amountWithUnit(holding),
                performance: performance.get(holding.instrument_id) ?? 0,
            })),
        [holdings, performance]
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return rows;
        return rows.filter((row) =>
            `${row.symbol} ${row.name} ${row.category}`.toLowerCase().includes(query)
        );
    }, [rows, search]);

    const handleExport = () =>
        downloadCsv("holdings.csv", buildHoldingsCsv(filtered));

    return (
        <DashboardCard
            title="Asset Performance Breakdown"
            icon={TableChartIcon}
            action={
                lastUpdated ? (
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {timeAgo(lastUpdated)}
                    </Typography>
                ) : undefined
            }
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
                mb={2}
            >
                <TextField
                    size="small"
                    placeholder="Search holdings..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{ maxWidth: 320, width: "100%" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleExport}
                    disabled={filtered.length === 0}
                >
                    Export CSV
                </Button>
            </Stack>

            {loading ? (
                <LoadingState height={40} lines={6} />
            ) : error ? (
                <EmptyState
                    title="Holdings unavailable"
                    description="We could not load your holdings."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon={TableChartIcon}
                    title={rows.length === 0 ? "No holdings yet" : "No matching holdings"}
                    description={
                        rows.length === 0
                            ? "Buy an instrument to start building your portfolio."
                            : "Try a different search term."
                    }
                />
            ) : (
                <TableContainer sx={{ mx: { xs: -2, md: -3 }, width: "auto" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {HEAD_CELLS.map((cell, index) => (
                                    <TableCell
                                        key={cell}
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "0.75rem",
                                            textTransform: "uppercase",
                                            display:
                                                index === 3
                                                    ? { xs: "none", sm: "table-cell" }
                                                    : index === 4
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
                            {filtered.map((row) => (
                                <HoldingsRow key={row.instrument_id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </DashboardCard>
    );
}
