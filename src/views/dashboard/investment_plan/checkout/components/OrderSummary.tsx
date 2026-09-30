"use client";

import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";

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

    return (
        <DashboardCard title={ORDER_SUMMARY_LABEL}>
            <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {plan.title}
                </Typography>

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
                                    fontWeight: 600,
                                    textAlign: "right",
                                    wordBreak: "break-word",
                                }}
                            >
                                {formatAmount(availableBalance ?? 0)}
                            </Box>
                        )
                    }
                />
                <DetailRow
                    label={AFTER_SUBSCRIPTION_LABEL}
                    value={loading ? "—" : formatAmount(remaining)}
                />
            </Stack>
        </DashboardCard>
    );
}
