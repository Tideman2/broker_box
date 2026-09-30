"use client";

import { Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import { formatAmount, toNumber } from "@/utils/format";

import {
    INVESTMENT_AMOUNT_LABEL,
    RISK_LABEL,
    DURATION_LABEL,
    ROI_LABEL,
    SELECTED_PLAN_LABEL,
} from "../mockContent";
import { formatDuration, formatRoi, RISK_LABELS } from "../../constants";

import type { PlanResponse } from "@/api/plan/types";

type SelectedPlanCardProps = {
    plan: PlanResponse;
};

function Row({ label, value }: { label: string; value: string }) {
    return (
        <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontWeight: 600, textAlign: "right" }}
            >
                {value}
            </Typography>
        </Stack>
    );
}

export default function SelectedPlanCard({ plan }: SelectedPlanCardProps) {
    return (
        <Card sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                    {SELECTED_PLAN_LABEL}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {plan.description}
                </Typography>
            </Stack>

            <Stack spacing={1.25} sx={{ mt: 2 }}>
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        {INVESTMENT_AMOUNT_LABEL}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.25 }}>
                        {formatAmount(toNumber(plan.min_amount))}
                    </Typography>
                </Box>

                <Row
                    label={DURATION_LABEL}
                    value={formatDuration(plan.duration)}
                />
                <Row label={ROI_LABEL} value={formatRoi(plan.roi)} />
                <Row
                    label={RISK_LABEL}
                    value={RISK_LABELS[plan.risk_management] ?? plan.risk_management}
                />
            </Stack>
        </Card>
    );
}
