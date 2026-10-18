"use client";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { alpha } from "@mui/material/styles";

import StatusPill from "@/components/StatusPill";
import { PATHS } from "@/routes/paths";
import { formatDate } from "@/utils/display";
import { toNumber } from "@/utils/format";
import { useRouter } from "next/navigation";

import {
    CANCEL_PLAN_LABEL,
    CURRENT_VALUE_LABEL,
    PERFORMANCE_LABEL,
    POOL_LABEL,
    PROFIT_LABEL,
    ROI_METRIC_LABEL,
    SUMMARY_PENDING_LABEL,
    VIEW_DETAILS_LABEL,
} from "../mockContent";
import {
    SUBSCRIPTION_STATUS_LABELS,
    SUBSCRIPTION_STATUS_TONES,
    formatRoi,
    profitTone,
} from "../constants";

import type {
    SubscriptionResponse,
    SubscriptionSummary,
} from "@/api/subscription/types";
import { useFormatCurrency } from "@/contexts/currency/hooks";

type ActiveSubscriptionCardProps = {
    subscription: SubscriptionResponse;
    /**
     * The matching summary row. Null for a subscription that has not started
     * yet, since GET /subscription/summary only reports ACTIVE ones. A failed
     * summary fetch also arrives as null — the card is meant to keep working
     * without it, so the two cases do not need to be told apart here.
     */
    summary?: SubscriptionSummary | null;
    onCancel: (subscription: SubscriptionResponse) => void;
    showCancel?: boolean;
    cancelling?: boolean;
};

type MetricProps = {
    label: string;
    value: string;
    tone?: "success" | "error";
};

function Metric({ label, value, tone }: MetricProps) {
    return (
        <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
                variant="caption"
                display="block"
                sx={{
                    fontWeight: 600,
                    color: tone ? `${tone}.main` : "text.secondary",
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 800,
                    fontVariantNumeric: "tabular-nums",
                    color: tone ? `${tone}.main` : undefined,
                }}
            >
                {value}
            </Typography>
        </Box>
    );
}

export default function ActiveSubscriptionCard({
    subscription,
    summary,
    onCancel,
    showCancel,
    cancelling,
}: ActiveSubscriptionCardProps) {
    const { formatAmount } = useFormatCurrency();
    const router = useRouter();

    const profitLoss = summary ? toNumber(summary.profit_loss) : 0;
    // A plain formatAmount renders a gain without a sign, which reads like a
    // balance rather than a movement, so gains are prefixed.
    const profitValue =
        profitLoss < 0 ? formatAmount(profitLoss) : `+${formatAmount(profitLoss)}`;

    return (
        <Card
            sx={{
                p: { xs: 2.5, md: 3 },
                position: "relative",
                overflow: "hidden",
                border: "1.5px solid",
                borderColor: "success.main",
                background: (theme) =>
                    `linear-gradient(120deg, ${alpha(theme.palette.success.main, 0.08)}, transparent 55%), ${theme.palette.background.paper}`,
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Stack spacing={0.5}>
                    <Typography
                        variant="overline"
                        sx={{ letterSpacing: "0.12em", fontWeight: 700 }}
                        color="success.main"
                    >
                        Active subscription
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {subscription.plan_title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}
                        >
                            {formatAmount(toNumber(subscription.invested_amount))}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            invested
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ flexWrap: "wrap", rowGap: 1 }}
                >
                    <StatusPill
                        status={subscription.status}
                        label={SUBSCRIPTION_STATUS_LABELS[subscription.status]}
                        tone={SUBSCRIPTION_STATUS_TONES[subscription.status]}
                    />
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                            router.push(
                                `${PATHS.dashboard.investmentPlansCheckout}?planId=${subscription.plan_id}`
                            )
                        }
                        sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                        {VIEW_DETAILS_LABEL}
                    </Button>
                    {showCancel && (
                        <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => onCancel(subscription)}
                            disabled={cancelling}
                            sx={{ borderRadius: 2, fontWeight: 600 }}
                        >
                            {CANCEL_PLAN_LABEL}
                        </Button>
                    )}
                </Stack>
            </Stack>

            <Box
                sx={{
                    mt: 2,
                    p: 1.75,
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: (theme) =>
                        alpha(theme.palette.text.primary, 0.02),
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                    }}
                >
                    {PERFORMANCE_LABEL}
                </Typography>

                <Stack
                    direction="row"
                    spacing={{ xs: 2.5, sm: 4 }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 1 }}
                >
                    <Metric
                        label={POOL_LABEL}
                        value={formatAmount(toNumber(subscription.pool))}
                    />
                    {summary ? (
                        <>
                            <Metric
                                label={CURRENT_VALUE_LABEL}
                                value={formatAmount(toNumber(summary.current_value))}
                            />
                            <Metric
                                label={PROFIT_LABEL}
                                value={profitValue}
                                tone={profitTone(profitLoss)}
                            />
                            <Metric
                                label={ROI_METRIC_LABEL}
                                value={formatRoi(summary.roi_percent)}
                                tone={profitTone(profitLoss)}
                            />
                        </>
                    ) : (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ alignSelf: "center" }}
                        >
                            {SUMMARY_PENDING_LABEL}
                        </Typography>
                    )}
                </Stack>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Chip
                    size="small"
                    icon={<CalendarMonthIcon sx={{ fontSize: 15 }} />}
                    label={`Expires ${formatDate(subscription.expiration_date)}`}
                    variant="outlined"
                    sx={{ fontWeight: 600, color: "text.secondary" }}
                />
            </Box>
        </Card>
    );
}
