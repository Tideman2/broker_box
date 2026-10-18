"use client";

import { Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { alpha } from "@mui/material/styles";

import DetailRow from "@/components/DetailRow";
import { toNumber } from "@/utils/format";

import {
    INVESTMENT_AMOUNT_LABEL,
    RISK_LABEL,
    DURATION_LABEL,
    ROI_LABEL,
    SELECTED_PLAN_LABEL,
} from "../mockContent";
import { formatDuration, formatRoi, RISK_LABELS } from "../../constants";

import type { PlanResponse } from "@/api/plan/types";
import { useFormatCurrency } from "@/contexts/currency/hooks";

type SelectedPlanCardProps = {
    plan: PlanResponse;
};

export default function SelectedPlanCard({ plan }: SelectedPlanCardProps) {
    const { formatAmount } = useFormatCurrency();
    return (
        <Card sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}>
            <Stack spacing={0.5}>
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.12em", fontWeight: 700 }}
                    color="primary.main"
                >
                    {SELECTED_PLAN_LABEL}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {plan.description}
                </Typography>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: "primary.main",
                        background: (theme) =>
                            `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.03)})`,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                    >
                        {INVESTMENT_AMOUNT_LABEL}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, mt: 0.5, fontVariantNumeric: "tabular-nums" }}
                    >
                        {formatAmount(toNumber(plan.min_amount))}
                    </Typography>
                </Box>

                <Stack spacing={1.25} divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />}>
                    <DetailRow
                        label={DURATION_LABEL}
                        value={formatDuration(plan.duration)}
                    />
                    <DetailRow label={ROI_LABEL} value={formatRoi(plan.roi)} />
                    <DetailRow
                        label={RISK_LABEL}
                        value={RISK_LABELS[plan.risk_management] ?? plan.risk_management}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
