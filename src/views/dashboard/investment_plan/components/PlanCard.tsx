"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import { PATHS } from "@/routes/paths";
import { formatAmount, toNumber } from "@/utils/format";

import {
    DURATION_LABEL,
    FEATURES_LABEL,
    MIN_AMOUNT_LABEL,
    PLAN_ACTIVE_BADGE,
    RECOMMENDED_LABEL,
    RISK_LABEL,
    ROI_LABEL,
    SELECT_LABEL,
} from "../mockContent";
import { formatDuration, formatRoi, RISK_LABELS } from "../constants";

import type { PlanResponse } from "@/api/plan/types";

type PlanCardProps = {
    plan: PlanResponse;
    /** Plan ids the user currently holds an active subscription for. */
    activePlanIds?: number[];
    disabled?: boolean;
};

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, wordBreak: "break-word" }}
            >
                {value}
            </Typography>
        </Box>
    );
}

function CardBadge({
    children,
    tone,
}: {
    children: React.ReactNode;
    tone: "primary" | "success";
}) {
    return (
        <Box
            sx={{
                px: 1,
                py: 0.25,
                borderRadius: 999,
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: tone === "primary" ? "primary.contrastText" : "success.contrastText",
                backgroundColor:
                    tone === "primary" ? "primary.main" : "success.main",
            }}
        >
            {children}
        </Box>
    );
}

export default function PlanCard({
    plan,
    activePlanIds,
    disabled,
}: PlanCardProps) {
    const router = useRouter();
    const recommended = plan.is_recommended === true;
    const active = activePlanIds?.includes(plan.id) === true;
    const hasBadges = recommended || active;

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: { xs: 2, md: 2.5 },
                position: "relative",
                border: "1px solid",
                borderColor: recommended ? "primary.main" : "divider",
                transition: "border-color 0.2s, box-shadow 0.2s",
                "&:hover": {
                    borderColor: recommended ? "primary.main" : "primary.main",
                },
            }}
        >
            {hasBadges && (
                <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                        position: "absolute",
                        top: { xs: 12, md: 16 },
                        right: { xs: 12, md: 16 },
                    }}
                >
                    {active && (
                        <CardBadge tone="success">{PLAN_ACTIVE_BADGE}</CardBadge>
                    )}
                    {recommended && (
                        <CardBadge tone="primary">{RECOMMENDED_LABEL}</CardBadge>
                    )}
                </Stack>
            )}

            <Stack spacing={0.5} sx={{ pr: hasBadges ? 10 : 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {plan.description}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap", rowGap: 1.5 }}>
                <Metric
                    label={MIN_AMOUNT_LABEL}
                    value={formatAmount(toNumber(plan.min_amount))}
                />
                <Metric label={ROI_LABEL} value={formatRoi(plan.roi)} />
                <Metric
                    label={DURATION_LABEL}
                    value={formatDuration(plan.duration)}
                />
            </Stack>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    {RISK_LABEL}
                </Typography>
                <Box
                    sx={{
                        mt: 0.5,
                        px: 1.25,
                        py: 0.5,
                        alignSelf: "flex-start",
                        borderRadius: 999,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.08),
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {RISK_LABELS[plan.risk_management] ?? plan.risk_management}
                    </Typography>
                </Box>
            </Box>

            {plan.features.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {FEATURES_LABEL}
                    </Typography>
                    <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                        {plan.features.map((feature) => (
                            <Stack
                                key={feature}
                                direction="row"
                                spacing={0.75}
                                alignItems="flex-start"
                            >
                                <CheckIcon
                                    sx={{
                                        fontSize: 16,
                                        mt: 0.25,
                                        flexShrink: 0,
                                        color: "success.main",
                                    }}
                                />
                                <Typography variant="body2">
                                    {feature}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            )}

            <Box sx={{ mt: "auto", pt: 2.5 }}>
                <Button
                    variant={recommended ? "contained" : "outlined"}
                    fullWidth
                    onClick={() =>
                        router.push(
                            `${PATHS.dashboard.investmentPlansCheckout}?planId=${plan.id}`
                        )
                    }
                    disabled={disabled || plan.status !== "ACTIVE"}
                >
                    {SELECT_LABEL} {plan.title}
                </Button>
            </Box>
        </Card>
    );
}
