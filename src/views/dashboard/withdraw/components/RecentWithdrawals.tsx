"use client";

import { useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

import DashboardCard from "@/components/DashboardCard";

import WithdrawalsTable from "./WithdrawalsTable";

import type { UserWithdrawalRecordsResponse } from "@/api/withdraw/types";

type Filter = "all" | "pending";

const RECENT_LIMIT = 5;

type RecentWithdrawalsProps = {
    records: UserWithdrawalRecordsResponse[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
    onRowClick?: (record: UserWithdrawalRecordsResponse) => void;
};

export default function RecentWithdrawals({
    records,
    loading,
    error,
    onRetry,
    onRowClick,
}: RecentWithdrawalsProps) {
    const [filter, setFilter] = useState<Filter>("all");

    const sorted = useMemo(
        () =>
            [...records].sort(
                (a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            ),
        [records]
    );

    const pendingCount = useMemo(
        () => sorted.filter((record) => record.status === "pending").length,
        [sorted]
    );

    const visible = useMemo(() => {
        const filtered =
            filter === "pending"
                ? sorted.filter((record) => record.status === "pending")
                : sorted;
        return filtered.slice(0, RECENT_LIMIT);
    }, [sorted, filter]);

    return (
        <DashboardCard title="Recent Withdrawals" icon={HistoryIcon}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1.5} mb={2}>
                <Typography variant="caption" color="text.secondary">
                    Track the status of your last 5 transactions.
                </Typography>
                <Stack direction="row" spacing={1}>
                    {(["all", "pending"] as Filter[]).map((value) => {
                        const active = filter === value;
                        return (
                            <Button
                                key={value}
                                size="small"
                                onClick={() => setFilter(value)}
                                variant={active ? "contained" : "text"}
                                sx={{
                                    minWidth: 64,
                                    textTransform: "capitalize",
                                    ...(active
                                        ? {}
                                        : {
                                              color: "text.secondary",
                                              border: "1px solid",
                                              borderColor: "divider",
                                          }),
                                }}
                            >
                                {value === "all"
                                    ? "All"
                                    : `Pending${pendingCount > 0 ? ` (${pendingCount})` : ""}`}
                            </Button>
                        );
                    })}
                </Stack>
            </Stack>

            <WithdrawalsTable
                records={visible}
                loading={loading}
                error={error}
                onRetry={onRetry}
                emptyTitle={
                    filter === "pending" ? "No pending withdrawals" : "No withdrawals yet"
                }
                emptyDescription={
                    filter === "pending"
                        ? "You have no withdrawal requests in progress."
                        : "Your withdrawal requests will appear here."
                }
                onRowClick={onRowClick}
            />

            <Box sx={{ mt: 1 }} />
        </DashboardCard>
    );
}