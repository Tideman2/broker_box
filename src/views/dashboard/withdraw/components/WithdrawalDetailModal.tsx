import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getWithdrawalDetail } from "@/app/actions/withdraw-actions";
import { withdrawQueryKeys } from "@/api/react-query-keys";

import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import DetailRow from "@/components/DetailRow";
import StatusPill from "@/components/StatusPill";

import { formatAmount, formatDate, truncateAddress } from "./utils";

type WithdrawalDetailModalProps = {
    recordId: number | null;
    onClose: () => void;
};

export default function WithdrawalDetailModal({
    recordId,
    onClose,
}: WithdrawalDetailModalProps) {
    const open = recordId != null;

    const detailQuery = useQuery({
        queryKey: withdrawQueryKeys.withdrawal(recordId ?? -1),
        queryFn: () => getWithdrawalDetail(recordId as number),
        enabled: open && recordId != null,
        refetchOnWindowFocus: false,
    });

    const record = detailQuery.data;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ pb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Withdrawal #{record?.id ?? recordId}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Full details of this withdrawal request
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                {detailQuery.isLoading ? (
                    <LoadingState height={36} lines={7} />
                ) : detailQuery.isError ? (
                    <EmptyState
                        title="Details unavailable"
                        description="We could not load this withdrawal record."
                        action={
                            <Button size="small" variant="outlined" onClick={() => detailQuery.refetch()}>
                                Retry
                            </Button>
                        }
                    />
                ) : !record ? (
                    <EmptyState title="No details" />
                ) : (
                    <Stack spacing={1.5} sx={{ pt: 1 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ pb: 0.5 }}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
                            >
                                {formatAmount(record.amount)}
                            </Typography>
                            <StatusPill status={record.status} />
                        </Stack>
                        <Divider sx={{ borderColor: "divider" }} />
                        <Stack spacing={1.25} divider={<Divider sx={{ borderColor: "divider" }} />}>
                            <DetailRow
                                label="Asset"
                                value={`${record.asset_symbol} — ${record.asset_name}`}
                            />
                            <DetailRow
                                label="Destination"
                                value={`${record.destination_label} (${record.destination_type})`}
                            />
                            {record.address && (
                                <DetailRow label="Wallet Address" value={truncateAddress(record.address, 12, 8)} />
                            )}
                            {record.bank_name && <DetailRow label="Bank Name" value={record.bank_name} />}
                            {record.account_name && <DetailRow label="Account Name" value={record.account_name} />}
                            {record.account_number && <DetailRow label="Account Number" value={record.account_number} />}
                            <DetailRow label="Requested" value={formatDate(record.created_at)} />
                            {record.confirmed_at && (
                                <DetailRow label="Confirmed" value={formatDate(record.confirmed_at)} />
                            )}
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, fontWeight: 600 }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
