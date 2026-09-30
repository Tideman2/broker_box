"use client";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { PATHS } from "@/routes/paths";
import { formatAmount } from "@/utils/format";

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
    const router = useRouter();

    if (!sufficient) {
        return (
            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => router.push(PATHS.dashboard.deposit)}
            >
                {DEPOSIT_FUNDS_LABEL}
            </Button>
        );
    }

    return (
        <Stack spacing={1.5}>
            <Box>
                <Typography variant="caption" color="text.secondary">
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
            >
                {submitting ? SUBSCRIBING_LABEL : CONFIRM_LABEL}
            </Button>
        </Stack>
    );
}
