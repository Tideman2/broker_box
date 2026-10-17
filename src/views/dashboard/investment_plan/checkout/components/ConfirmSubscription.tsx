"use client";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import { PATHS } from "@/routes/paths";
import { useFormatCurrency } from "@/contexts/currency/hooks";

import {
    CONFIRM_LABEL,
    DEDUCTION_NOTICE,
    DEPOSIT_FUNDS_LABEL,
    SUBSCRIBING_LABEL,
} from "../mockContent";

type ConfirmSubscriptionProps = {
    planCost: number;
    remaining: number;
    submitting?: boolean;
    sufficient: boolean;
    error?: string;
    onConfirm: () => void;
};

export default function ConfirmSubscription({
    planCost,
    remaining,
    submitting,
    sufficient,
    error,
    onConfirm,
}: ConfirmSubscriptionProps) {
    const { formatAmount } = useFormatCurrency();
    const router = useRouter();

    if (!sufficient) {
        return (
            <Stack spacing={1.5}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() => router.push(PATHS.dashboard.deposit)}
                    sx={{ borderRadius: 2, fontWeight: 700, py: 1.5 }}
                >
                    {DEPOSIT_FUNDS_LABEL}
                </Button>
            </Stack>
        );
    }

    return (
        <Stack spacing={1.5}>
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: (theme) =>
                        alpha(theme.palette.info.main, 0.05),
                }}
            >
                <LockOutlinedIcon
                    sx={{ fontSize: 18, color: "info.main", mt: 0.25, flexShrink: 0 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {DEDUCTION_NOTICE.replace(
                        "{amount}",
                        formatAmount(planCost)
                    ).replace("{remaining}", formatAmount(remaining))}
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" variant="outlined">
                    {error}
                </Alert>
            )}

            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={onConfirm}
                disabled={submitting}
                sx={{ borderRadius: 2, fontWeight: 700, py: 1.5 }}
            >
                {submitting ? SUBSCRIBING_LABEL : CONFIRM_LABEL}
            </Button>
        </Stack>
    );
}
