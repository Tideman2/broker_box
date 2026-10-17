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
    VIEW_DETAILS_LABEL,
} from "../mockContent";
import {
    SUBSCRIPTION_STATUS_LABELS,
    SUBSCRIPTION_STATUS_TONES,
} from "../constants";

import type { SubscriptionResponse } from "@/api/subscription/types";
import { useFormatCurrency } from "@/contexts/currency/hooks";

type ActiveSubscriptionCardProps = {
    subscription: SubscriptionResponse;
    onCancel: (subscription: SubscriptionResponse) => void;
    showCancel?: boolean;
    cancelling?: boolean;
};

export default function ActiveSubscriptionCard({
    subscription,
    onCancel,
    showCancel,
    cancelling,
}: ActiveSubscriptionCardProps) {
    const { formatAmount } = useFormatCurrency();
    const router = useRouter();

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
