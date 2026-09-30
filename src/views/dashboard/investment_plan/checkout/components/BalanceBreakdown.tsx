"use client";

import { Alert, Box, Skeleton, Stack, Typography } from "@mui/material";

import DetailRow from "@/components/DetailRow";
import { formatAmount } from "@/utils/format";

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

    if (loading) {
        return (
            <Box
                sx={{
                    p: { xs: 2, md: 2.5 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Skeleton variant="rounded" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="rounded" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="rounded" height={20} />
            </Box>
        );
    }

    const remaining = (availableBalance ?? 0) - planCost;
    const insufficient = remaining < 0 || stale === true;

    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    p: { xs: 2, md: 2.5 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack spacing={1.25}>
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
                            pt: 1.25,
                            mt: 0.25,
                            borderTop: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <DetailRow
                            label={BALANCE_AFTER_LABEL}
                            value={formatAmount(remaining)}
                        />
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
