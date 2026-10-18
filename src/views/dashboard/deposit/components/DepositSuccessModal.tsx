import { Box, Button, Dialog, DialogContent, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DetailRow from "@/components/DetailRow";
import StatusPill from "@/components/StatusPill";

import { formatDate } from "@/utils/display";

import { SUCCESS_MODAL_CAPTION, SUCCESS_MODAL_TITLE } from "./mockContent";

import type { DepositFundsResponse } from "@/api/deposit/types";
import { useFormatCurrency } from "@/contexts/currency/hooks";

type DepositSuccessModalProps = {
    data: DepositFundsResponse | null;
    onDone: () => void;
};

export default function DepositSuccessModal({ data, onDone }: DepositSuccessModalProps) {
    const { formatAmount } = useFormatCurrency();
    const open = data != null;

    return (
        <Dialog open={open} onClose={onDone} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogContent sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3.5, sm: 4 } }}>
                <Stack spacing={2.5} alignItems="center">
                    <Box
                        sx={{
                            width: 88,
                            height: 88,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.success.main, 0.12),
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 52, color: "success.main" }} />
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {SUCCESS_MODAL_TITLE}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {SUCCESS_MODAL_CAPTION}
                        </Typography>
                    </Box>

                    <Stack
                        spacing={1.25}
                        width="100%"
                        sx={{
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.text.primary, 0.015),
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
                            label="Method"
                            value={
                                data
                                    ? `${data.payment_method_name} (${data.payment_method_type})`
                                    : undefined
                            }
                        />
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

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={onDone}
                        sx={{ borderRadius: 2, fontWeight: 700, py: 1.5 }}
                    >
                        Done
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
