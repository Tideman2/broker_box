"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import { getPlans } from "@/app/actions/plan-actions";
import {
    cancelSubscription,
    getSubscriptions,
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
    BALANCE_ERROR_DESCRIPTION,
    BALANCE_ERROR_TITLE,
    BALANCE_LOADING_LABEL,
    PLANS_RETRY_LABEL,
    SUBSCRIPTIONS_ERROR_LABEL,
} from "./mockContent";
import {
    ACTIVE_SUBSCRIPTION_STATUSES,
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

    const cancelMutation = useMutation({
        mutationFn: cancelSubscription,
        onMutate: () => setCancelError(""),
        onSuccess: (result) => {
            if (!result.success) {
                setCancelError(result.error);
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
            queryClient.invalidateQueries({
                predicate: (query) => isAvailableBalanceKey(query.queryKey),
            });
        },
        onError: (error: unknown) => setCancelError(extractErrorMessage(error)),
    });

    const plans = plansQuery.data?.plans ?? [];
    const subscriptions = subscriptionsQuery.data?.subscriptions ?? [];
    console.log(subscriptions)
    const activeSubscription =
        subscriptions.find((subscription) =>
            ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status)
        ) ?? null;

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

                {!subscriptionsQuery.isLoading &&
                    !subscriptionsQuery.isError &&
                    !activeSubscription && (
                        <Alert severity="info" variant="outlined">
                            {ACTIVE_PLAN_EMPTY}
                        </Alert>
                    )}

                {activeSubscription && (
                    <ActiveSubscriptionCard
                        subscription={activeSubscription}
                        onCancel={handleCancel}
                        showCancel={SUBSCRIPTION_CANCEL_ENABLED}
                        cancelling={cancelMutation.isPending}
                    />
                )}

                <PlanGrid
                    plans={plans}
                    loading={plansQuery.isLoading}
                    error={plansQuery.isError}
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
