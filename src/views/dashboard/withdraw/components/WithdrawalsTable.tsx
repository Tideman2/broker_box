import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import StatusPill from "./StatusPill";

import { formatAmount, formatDate } from "./utils";

import type { UserWithdrawalRecordsResponse } from "@/api/withdraw/types";

const HEAD_CELLS = ["ID", "Asset", "Amount", "Status", "Date"];

type WithdrawalsTableProps = {
    records: UserWithdrawalRecordsResponse[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
    emptyTitle?: string;
    emptyDescription?: string;
    onRowClick?: (record: UserWithdrawalRecordsResponse) => void;
};

export default function WithdrawalsTable({
    records,
    loading,
    error,
    onRetry,
    emptyTitle = "No withdrawals yet",
    emptyDescription = "Your withdrawal requests will appear here.",
    onRowClick,
}: WithdrawalsTableProps) {
    if (loading) return <LoadingState height={40} lines={5} />;

    if (error) {
        return (
            <EmptyState
                title="Withdrawals unavailable"
                description="We could not load your withdrawal history."
                action={
                    <Button size="small" variant="outlined" onClick={onRetry}>
                        Retry
                    </Button>
                }
            />
        );
    }

    if (records.length === 0) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return (
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
                    {records.map((record) => (
                        <TableRow
                            key={record.id}
                            hover
                            onClick={() => onRowClick?.(record)}
                            sx={
                                onRowClick
                                    ? { cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }
                                    : undefined
                            }
                        >
                            <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>
                                #{record.id}
                            </TableCell>
                            <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                                {record.asset_symbol} · {record.asset_name}
                            </TableCell>
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {formatAmount(record.amount, 0)}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                <StatusPill status={record.status} />
                            </TableCell>
                            <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>
                                {formatDate(record.created_at)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}