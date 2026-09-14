import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import DashboardCard from "@/components/DashboardCard";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import StatusPill from "@/components/StatusPill";

import { formatDate } from "@/utils/display";
import { formatAmount, toNumber } from "@/utils/format";

import type { DepositResponse } from "@/api/deposit/types";

const HEAD_CELLS = ["ID", "Method", "Amount", "Asset", "Status", "Date"];

type RecentDepositsProps = {
    deposits: DepositResponse[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
    hasMore?: boolean;
    loadingMore?: boolean;
    onLoadMore?: () => void;
    onRowClick?: (deposit: DepositResponse) => void;
};

export default function RecentDeposits({
    deposits,
    loading,
    error,
    onRetry,
    hasMore,
    loadingMore,
    onLoadMore,
    onRowClick,
}: RecentDepositsProps) {
    if (loading) return <LoadingState height={40} lines={5} />;

    if (error) {
        return (
            <EmptyState
                title="Deposits unavailable"
                description="We could not load your deposit history."
                action={
                    <Button size="small" variant="outlined" onClick={onRetry}>
                        Retry
                    </Button>
                }
            />
        );
    }

    if (deposits.length === 0) {
        return (
            <EmptyState
                title="No deposits yet"
                description="Your deposit requests will appear here."
            />
        );
    }

    return (
        <DashboardCard title="Recent Deposits">
            <TableContainer sx={{ mx: { xs: -2, md: -3 }, width: "auto" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {HEAD_CELLS.map((cell) => (
                                <TableCell
                                    key={cell}
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.75rem",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deposits.map((deposit) => (
                            <TableRow
                                key={deposit.id}
                                hover
                                onClick={() => onRowClick?.(deposit)}
                                sx={
                                    onRowClick
                                        ? { cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }
                                        : undefined
                                }
                            >
                                <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>
                                    #{deposit.id}
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                                    {deposit.payment_method}
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {formatAmount(toNumber(deposit.amount), 0)}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>{deposit.asset}</TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    <StatusPill status={deposit.status} />
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>
                                    {formatDate(deposit.date)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {hasMore && (
                <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={onLoadMore}
                    disabled={loadingMore}
                    startIcon={loadingMore ? <CircularProgress size={14} /> : undefined}
                >
                    {loadingMore ? "Loading..." : "Load More"}
                </Button>
            )}
        </DashboardCard>
    );
}