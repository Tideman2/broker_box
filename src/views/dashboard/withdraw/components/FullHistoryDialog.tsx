import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ pb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Withdrawal History
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {sorted.length} transaction{sorted.length === 1 ? "" : "s"} · newest first
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <WithdrawalsTable records={sorted} onRowClick={onRowClick} />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, fontWeight: 600 }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
