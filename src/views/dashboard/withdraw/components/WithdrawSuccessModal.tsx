import { Box, Button, Dialog, DialogContent, Divider, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DetailRow from "./DetailRow";
import StatusPill from "./StatusPill";

import { formatAmount, formatDate, truncateAddress } from "./utils";
import { SUCCESS_MODAL_CAPTION, SUCCESS_MODAL_TITLE } from "./mockContent";

import type { WithdrawFundsResponse } from "@/api/withdraw/types";

type WithdrawSuccessModalProps = {
    data: WithdrawFundsResponse | null;
    onDone: () => void;
};

export default function WithdrawSuccessModal({ data, onDone }: WithdrawSuccessModalProps) {
    const open = data != null;

    return (
        <Dialog open={open} onClose={onDone} fullWidth maxWidth="sm">
            <DialogContent sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 4 } }}>
                <Stack spacing={2} alignItems="center">
                    <CheckCircleIcon sx={{ fontSize: 56, color: "success.main" }} />
                    <Box textAlign="center">
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {SUCCESS_MODAL_TITLE}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {SUCCESS_MODAL_CAPTION}
                        </Typography>
                    </Box>

                    <Stack
                        spacing={1.25}
                        width="100%"
                        sx={{
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                        divider={<Divider sx={{ borderColor: "divider" }} />}
                    >
                        <DetailRow label="Amount" value={formatAmount(data ? data.amount : 0)} />
                        <DetailRow
                            label="Status"
                            valueNode={data ? <StatusPill status={data.status} /> : null}
                        />
                        <DetailRow
                            label="Asset"
                            value={
                                data
                                    ? `${data.asset_symbol} — ${data.asset_name}`
                                    : undefined
                            }
                        />
                        <DetailRow
                            label="Destination"
                            value={
                                data
                                    ? `${data.destination_label} (${data.destination_type})`
                                    : undefined
                            }
                        />
                        {data?.address && (
                            <DetailRow
                                label="Wallet Address"
                                value={truncateAddress(data.address, 12, 8)}
                            />
                        )}
                        {data?.bank_name && (
                            <DetailRow label="Bank Name" value={data.bank_name} />
                        )}
                        {data?.account_name && (
                            <DetailRow label="Account Name" value={data.account_name} />
                        )}
                        {data?.account_number && (
                            <DetailRow label="Account Number" value={data.account_number} />
                        )}
                        {data && (
                            <DetailRow label="Requested" value={formatDate(data.created_at)} />
                        )}
                    </Stack>

                    <Button variant="contained" size="large" fullWidth onClick={onDone}>
                        Done
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}