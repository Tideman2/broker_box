"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Stack, Typography } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import { getPlans } from "@/app/actions/plan-actions";
import {
    cancelSubscription,
    getSubscriptions,
    getSubscriptionSummary,
} from "@/app/actions/subscription-actions";
import { getAvailableBalance } from "@/app/actions/deposit-actions";

import {
    isAvailableBalanceKey,
    planQueryKeys,
    subscriptionQueryKeys,
    depositQueryKeys,
} from "@/api/react-query-keys";
import { extractErrorMessage } from "@/utils/display";

import ActiveSubscriptionCard from "./components/ActiveSubscriptionCard";
import AvailableBalanceBanner from "./components/AvailableBalanceBanner";
import CancelPlanDialog from "./components/CancelPlanDialog";
import InvestmentPlansHeader from "./components/InvestmentPlansHeader";
import PlanGrid from "./components/PlanGrid";

import {
    ACTIVE_PLAN_EMPTY,
    ACTIVE_PLANS_LABEL,
    BALANCE_ERROR_DESCRIPTION,
    BALANCE_ERROR_TITLE,
    BALANCE_LOADING_LABEL,
    PLANS_RETRY_LABEL,
    SUBSCRIPTIONS_ERROR_LABEL,
    SUMMARY_ERROR_LABEL,
} from "./mockContent";
import {
    ACTIVE_SUBSCRIPTION_STATUSES,
    CANCELLABLE_STATUSES,
    SUBSCRIPTION_CANCEL_ENABLED,
} from "./constants";

import type { SubscriptionResponse } from "@/api/subscription/types";

export default function InvestmentPlan() {
    const queryClient = useQueryClient();

    const [cancelTarget, setCancelTarget] =
        useState<SubscriptionResponse | null>(null);
    const [cancelError, setCancelError] = useState("");
    const [actionNotice, setActionNotice] = useState("");

    const plansQuery = useQuery({
        queryKey: planQueryKeys.plans,
        queryFn: getPlans,
        refetchOnWindowFocus: false,
    });

    const subscriptionsQuery = useQuery({
        queryKey: subscriptionQueryKeys.subscriptions,
        queryFn: getSubscriptions,
        refetchOnWindowFocus: false,
    });

    const balanceQuery = useQuery({
        queryKey: depositQueryKeys.availableBalance,
        queryFn: getAvailableBalance,
        refetchOnWindowFocus: false,
    });

    const subscriptions = subscriptionsQuery.data?.subscriptions ?? [];
    // A live subscription is running or about to start; only a running one is
    // reported by GET /subscription/summary, so the summary request is skipped
    // entirely for a user who has none.
    const liveSubscriptions = subscriptions.filter((subscription) =>
        ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status)
    );
    const hasActiveSubscription = liveSubscriptions.some(
        (subscription) => subscription.status === "ACTIVE"
    );

    const summaryQuery = useQuery({
        queryKey: subscriptionQueryKeys.summary,
        queryFn: getSubscriptionSummary,
        enabled: !subscriptionsQuery.isLoading && hasActiveSubscription,
        refetchOnWindowFocus: false,
        // A 404 here means the backend is not on the new contract yet, which is
        // not transient. The default 3 retries would delay the warning alert by
        // ~7s and make its retry button look dead.
        retry: false,
    });

    const cancelMutation = useMutation({
        mutationFn: cancelSubscription,
        onMutate: () => setCancelError(""),
        onSuccess: (result) => {
            if (!result.success) {
                setCancelError(result.error);
                // A rejection usually means the cached status has drifted from
                // the server's (cancelled elsewhere, expired meanwhile), so
                // resync rather than leave a cancel button the backend will
                // keep refusing.
                queryClient.invalidateQueries({
                    queryKey: subscriptionQueryKeys.subscriptions,
                });
                return;
            }
            setCancelTarget(null);
            setActionNotice(
                result.data.status === "CANCELLED"
                    ? `${result.data.plan_title} is now cancelled.`
                    : `${result.data.plan_title} was updated to ${result.data.status.toLowerCase()}.`
            );
            queryClient.invalidateQueries({
                queryKey: subscriptionQueryKeys.subscriptions,
            });
            // A cancel settles the subscription, so its summary row is gone.
            queryClient.invalidateQueries({
                queryKey: subscriptionQueryKeys.summary,
            });
            // The released pool lands back in the available balance.
            queryClient.invalidateQueries({
                predicate: (query) => isAvailableBalanceKey(query.queryKey),
            });
        },
        onError: (error: unknown) => setCancelError(extractErrorMessage(error)),
    });

    const plans = plansQuery.data?.plans ?? [];
    const summaries = summaryQuery.data ?? [];
    const summaryFor = (subscriptionId: number) =>
        summaries.find((row) => row.subscription_id === subscriptionId) ?? null;

    const handleCancel = (subscription: SubscriptionResponse) => {
        setCancelError("");
        setCancelTarget(subscription);
    };

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <InvestmentPlansHeader />

                {actionNotice && (
                    <Alert
                        severity="success"
                        variant="outlined"
                        onClose={() => setActionNotice("")}
                    >
                        {actionNotice}
                    </Alert>
                )}

                <AvailableBalanceBanner
                    balance={balanceQuery.data}
                    loading={balanceQuery.isLoading}
                    error={balanceQuery.isError}
                    onRetry={() => balanceQuery.refetch()}
                    retryLabel={PLANS_RETRY_LABEL}
                    errorTitle={BALANCE_ERROR_TITLE}
                    errorDescription={BALANCE_ERROR_DESCRIPTION}
                    loadingLabel={BALANCE_LOADING_LABEL}
                />

                {subscriptionsQuery.isError && (
                    <Alert
                        severity="warning"
                        variant="outlined"
                        action={
                            <Button
                                size="small"
                                color="inherit"
                                onClick={() => subscriptionsQuery.refetch()}
                            >
                                {PLANS_RETRY_LABEL}
                            </Button>
                        }
                    >
                        {SUBSCRIPTIONS_ERROR_LABEL}
                    </Alert>
                )}

                {/* Performance is supplementary: without it the cards still show
                    the plan, the pool and the expiry, so a failed summary fetch
                    must never take the section down. */}
                {summaryQuery.isError && hasActiveSubscription && (
                    <Alert
                        severity="warning"
                        variant="outlined"
                        action={
                            <Button
                                size="small"
                                color="inherit"
                                onClick={() => summaryQuery.refetch()}
                            >
                                {PLANS_RETRY_LABEL}
                            </Button>
                        }
                    >
                        {SUMMARY_ERROR_LABEL}
                    </Alert>
                )}

                {!subscriptionsQuery.isLoading &&
                    !subscriptionsQuery.isError &&
                    liveSubscriptions.length === 0 && (
                        <Alert severity="info" variant="outlined">
                            {ACTIVE_PLAN_EMPTY}
                        </Alert>
                    )}

                {liveSubscriptions.length > 0 && (
                    <Stack spacing={2}>
                        <Typography variant="overline" color="text.secondary">
                            {ACTIVE_PLANS_LABEL}
                        </Typography>

                        {liveSubscriptions.map((subscription) => (
                            <ActiveSubscriptionCard
                                key={subscription.id}
                                subscription={subscription}
                                summary={summaryFor(subscription.id)}
                                summaryLoading={summaryQuery.isLoading}
                                showCancel={
                                    SUBSCRIPTION_CANCEL_ENABLED &&
                                    CANCELLABLE_STATUSES.includes(
                                        subscription.status
                                    )
                                }
                                cancelling={cancelMutation.isPending}
                                onCancel={handleCancel}
                            />
                        ))}
                    </Stack>
                )}

                <PlanGrid
                    plans={plans}
                    loading={plansQuery.isLoading}
                    error={plansQuery.isError}
                    /* The badge says "Active", so it must not light up for a
                       subscription that is only pending to start. */
                    activePlanIds={subscriptions
                        .filter(
                            (subscription) => subscription.status === "ACTIVE"
                        )
                        .map((subscription) => subscription.plan_id)}
                    onRetry={() => plansQuery.refetch()}
                />
            </Stack>

            <CancelPlanDialog
                open={cancelTarget != null}
                planTitle={cancelTarget?.plan_title}
                cancelling={cancelMutation.isPending}
                error={cancelError || undefined}
                onKeep={() => setCancelTarget(null)}
                onConfirm={() => {
                    if (cancelTarget) cancelMutation.mutate(cancelTarget.id);
                }}
            />
        </ContentWrapper>
    );
}
