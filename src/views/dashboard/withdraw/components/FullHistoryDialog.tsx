import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import WithdrawalsTable from "./WithdrawalsTable";

import type { UserWithdrawalRecordsResponse } from "@/api/withdraw/types";

type FullHistoryDialogProps = {
    open: boolean;
    records: UserWithdrawalRecordsResponse[];
    onClose: () => void;
    onRowClick?: (record: UserWithdrawalRecordsResponse) => void;
};

export default function FullHistoryDialog({
    open,
    records,
    onClose,
    onRowClick,
}: FullHistoryDialogProps) {
    const sorted = [...records].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Withdrawal History</DialogTitle>
            <DialogContent>
                <WithdrawalsTable records={sorted} onRowClick={onRowClick} />
            </DialogContent>
        </Dialog>
    );
}