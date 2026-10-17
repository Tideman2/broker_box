"use client";

import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import DashboardCard from "@/components/DashboardCard";
import DetailRow from "@/components/DetailRow";
import { formatAmount } from "@/utils/format";

import {
    AFTER_SUBSCRIPTION_LABEL,
    BALANCE_LABEL,
    DURATION_LABEL,
    EXPECTED_ROI_LABEL,
    INITIAL_INVESTMENT_LABEL,
    ORDER_SUMMARY_LABEL,
    TOTAL_DEDUCTION_LABEL,
} from "../mockContent";
import { formatDuration, formatRoi } from "../../constants";

import type { PlanResponse } from "@/api/plan/types";

type OrderSummaryProps = {
    plan: PlanResponse;
    planCost: number;
    availableBalance?: number;
    loading?: boolean;
};

export default function OrderSummary({
    plan,
    planCost,
    availableBalance,
    loading,
}: OrderSummaryProps) {
    const remaining = (availableBalance ?? 0) - planCost;
    const sufficient = remaining >= 0;

    return (
        <DashboardCard
            title={ORDER_SUMMARY_LABEL}
            sx={{ position: { lg: "sticky" }, top: { lg: 88 }, zIndex: { lg: 1 } }}
        >
            <Stack spacing={1.25}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    {plan.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {formatDuration(plan.duration)} · {formatRoi(plan.roi)} expected return
                </Typography>

                <Divider sx={{ borderColor: "divider", my: 0.5 }} />

                <DetailRow
                    label={INITIAL_INVESTMENT_LABEL}
                    value={formatAmount(planCost)}
                />
                <DetailRow
                    label={DURATION_LABEL}
                    value={formatDuration(plan.duration)}
                />
                <DetailRow
                    label={EXPECTED_ROI_LABEL}
                    value={formatRoi(plan.roi)}
                />

                <Divider sx={{ borderColor: "divider", my: 0.5 }} />

                <DetailRow
                    label={TOTAL_DEDUCTION_LABEL}
                    value={formatAmount(planCost)}
                />
                <DetailRow
                    label={BALANCE_LABEL}
                    valueNode={
                        loading ? (
                            <Skeleton width={72} height={18} />
                        ) : (
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                    textAlign: "right",
                                    wordBreak: "break-word",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {formatAmount(availableBalance ?? 0)}
                            </Box>
                        )
                    }
                />
                <Box
                    sx={{
                        mt: 0.5,
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                            loading
                                ? "transparent"
                                : sufficient
                                  ? alpha(theme.palette.success.main, 0.08)
                                  : alpha(theme.palette.warning.main, 0.1),
                    }}
                >
                    <DetailRow
                        label={AFTER_SUBSCRIPTION_LABEL}
                        value={loading ? "—" : formatAmount(remaining)}
                    />
                </Box>
            </Stack>
        </DashboardCard>
    );
}
