"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import StatusPill from "@/components/StatusPill";

import { PATHS } from "@/routes/paths";
import { toNumber } from "@/utils/format";

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
import { useFormatCurrency } from "@/contexts/currency/hooks";

type PlanCardProps = {
    plan: PlanResponse;
    /** Plan ids the user currently holds an active subscription for. */
    activePlanIds?: number[];
    disabled?: boolean;
};

const RISK_TONE: Record<string, "success" | "error" | "info"> = {
    LOW: "success",
    MODERATE: "info",
    MEDIUM: "info",
    HIGH: "error",
};

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}
            >
                {label}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, wordBreak: "break-word", fontVariantNumeric: "tabular-nums" }}
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
                px: 1.25,
                py: 0.35,
                borderRadius: 999,
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: tone === "primary" ? "primary.contrastText" : "success.contrastText",
                backgroundColor:
                    tone === "primary" ? "primary.main" : "success.main",
                boxShadow: (theme) =>
                    tone === "primary"
                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                        : `0 4px 12px ${alpha(theme.palette.success.main, 0.4)}`,
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
    const { formatAmount } = useFormatCurrency();
    const recommended = plan.is_recommended === true;
    const active = activePlanIds?.includes(plan.id) === true;
    const hasBadges = recommended || active;
    const riskTone = RISK_TONE[plan.risk_management] ?? "info";

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: { xs: 2.5, md: 3 },
                position: "relative",
                overflow: "hidden",
                border: "1.5px solid",
                borderColor: recommended ? "primary.main" : "divider",
                boxShadow: recommended
                    ? (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.16)}`
                    : "none",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                        `0 12px 36px ${alpha(theme.palette.primary.main, 0.18)}`,
                },
            }}
        >
            {recommended && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: (theme) =>
                            `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                />
            )}
            {hasBadges && (
                <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                        position: "absolute",
                        top: { xs: 14, md: 18 },
                        right: { xs: 14, md: 18 },
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

            <Stack spacing={0.5} sx={{ pr: hasBadges ? 9 : 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {plan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {plan.description}
                </Typography>
            </Stack>

            <Box
                sx={{
                    mt: 2,
                    p: 1.75,
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: recommended ? "primary.main" : "divider",
                    backgroundColor: (theme) =>
                        recommended
                            ? alpha(theme.palette.primary.main, 0.06)
                            : alpha(theme.palette.text.primary, 0.02),
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                >
                    {MIN_AMOUNT_LABEL}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
                >
                    {formatAmount(toNumber(plan.min_amount))}
                </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Metric label={ROI_LABEL} value={formatRoi(plan.roi)} />
                <Metric
                    label={DURATION_LABEL}
                    value={formatDuration(plan.duration)}
                />
            </Stack>

            <Box sx={{ mt: 2 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                >
                    {RISK_LABEL}
                </Typography>
                <Box sx={{ mt: 0.75 }}>
                    <StatusPill
                        status={plan.risk_management.toLowerCase()}
                        label={RISK_LABELS[plan.risk_management] ?? plan.risk_management}
                        tone={riskTone}
                    />
                </Box>
            </Box>

            {plan.features.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                    >
                        {FEATURES_LABEL}
                    </Typography>
                    <Stack spacing={0.75} sx={{ mt: 1 }}>
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
                                <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
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
                    size="large"
                    fullWidth
                    onClick={() =>
                        router.push(
                            `${PATHS.dashboard.investmentPlansCheckout}?planId=${plan.id}`
                        )
                    }
                    disabled={disabled || plan.status !== "ACTIVE"}
                    sx={{ borderRadius: 2, fontWeight: 700, py: 1.4 }}
                >
                    {SELECT_LABEL} {plan.title}
                </Button>
            </Box>
        </Card>
    );
}
