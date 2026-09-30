"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import StatusPill from "@/components/StatusPill";
import { PATHS } from "@/routes/paths";
import { formatDate } from "@/utils/display";
import { formatAmount, toNumber } from "@/utils/format";
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
    const router = useRouter();

    return (
        <Card sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Stack spacing={0.5}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {subscription.plan_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatAmount(toNumber(subscription.invested_amount))}{" "}
                        invested
                    </Typography>
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
                        >
                            {CANCEL_PLAN_LABEL}
                        </Button>
                    )}
                </Stack>
            </Stack>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                    Expires {formatDate(subscription.expiration_date)}
                </Typography>
            </Box>
        </Card>
    );
}
