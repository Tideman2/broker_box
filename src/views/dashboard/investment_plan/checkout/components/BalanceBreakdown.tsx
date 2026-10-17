"use client";

import { Alert, Box, Skeleton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import DetailRow from "@/components/DetailRow";
import { useFormatCurrency } from "@/contexts/currency/hooks";

import {
    BALANCE_AFTER_LABEL,
    BALANCE_LABEL,
    INSUFFICIENT_SHORT,
    INSUFFICIENT_STALE,
    INSUFFICIENT_TITLE,
    PLAN_COST_LABEL,
} from "../mockContent";

type BalanceBreakdownProps = {
    planCost: number;
    availableBalance?: number;
    loading?: boolean;
    /** Set when the backend rejected the submit for insufficient funds. */
    stale?: boolean;
};

export default function BalanceBreakdown({
    planCost,
    availableBalance,
    loading,
    stale,
}: BalanceBreakdownProps) {
    const { formatAmount } = useFormatCurrency();

    if (loading) {
        return (
            <Box
                sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Skeleton variant="rounded" height={20} sx={{ mb: 1, borderRadius: 1 }} />
                <Skeleton variant="rounded" height={20} sx={{ mb: 1, borderRadius: 1 }} />
                <Skeleton variant="rounded" height={20} sx={{ borderRadius: 1 }} />
            </Box>
        );
    }

    const remaining = (availableBalance ?? 0) - planCost;
    const insufficient = remaining < 0 || stale === true;

    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 3,
                    border: "1.5px solid",
                    borderColor: insufficient ? "warning.main" : "divider",
                    backgroundColor: (theme) =>
                        insufficient
                            ? alpha(theme.palette.warning.main, 0.05)
                            : "background.paper",
                }}
            >
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.12em", fontWeight: 700 }}
                    color="text.secondary"
                >
                    Cost vs balance
                </Typography>
                <Stack spacing={1.25} sx={{ mt: 1.5 }}>
                    <DetailRow
                        label={PLAN_COST_LABEL}
                        value={formatAmount(planCost)}
                    />
                    <DetailRow
                        label={BALANCE_LABEL}
                        value={formatAmount(availableBalance ?? 0)}
                    />
                    <Box
                        sx={{
                            pt: 1.5,
                            mt: 0.25,
                            borderTop: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {BALANCE_AFTER_LABEL}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                    fontVariantNumeric: "tabular-nums",
                                    color: insufficient ? "warning.main" : "success.main",
                                }}
                            >
                                {formatAmount(remaining)}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            {insufficient && (
                <Alert severity="warning" variant="outlined">
                    <Stack spacing={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {INSUFFICIENT_TITLE}
                        </Typography>
                        <Typography variant="caption">
                            {stale
                                ? INSUFFICIENT_STALE
                                : INSUFFICIENT_SHORT.replace(
                                      "{amount}",
                                      formatAmount(Math.abs(remaining))
                                  )}
                        </Typography>
                    </Stack>
                </Alert>
            )}
        </Stack>
    );
}
