"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

import ContentWrapper from "@/layout/components/ContentWrapper";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import { getPlans } from "@/app/actions/plan-actions";
import { subscribeToPlan } from "@/app/actions/subscription-actions";
import { getAvailableBalance } from "@/app/actions/deposit-actions";

import {
    depositQueryKeys,
    isAvailableBalanceKey,
    planQueryKeys,
    subscriptionQueryKeys,
} from "@/api/react-query-keys";
import { PATHS } from "@/routes/paths";
import { extractErrorMessage } from "@/utils/display";
import { toNumber } from "@/utils/format";

import BalanceBreakdown from "./components/BalanceBreakdown";
import CheckoutHeader from "./components/CheckoutHeader";
import ConfirmSubscription from "./components/ConfirmSubscription";
import OrderSummary from "./components/OrderSummary";
import SelectedPlanCard from "./components/SelectedPlanCard";
import SubscriptionSuccess from "./components/SubscriptionSuccess";

import {
    BACK_LABEL,
    LOAD_ERROR_DESCRIPTION,
    LOAD_ERROR_TITLE,
} from "./mockContent";

import type { SubscriptionResponse } from "@/api/subscription/types";

type InvestmentPlanCheckoutProps = {
    planId: number | null;
};

/**
 * The balance the user was actually shown and agreed to. The query is
 * invalidated on success, but its data is still the pre-deduction value at the
 * moment the success view renders, so it cannot be used to derive the
 * remaining balance.
 */
type SubscriptionOutcome = {
    subscription: SubscriptionResponse;
    balanceAtSubmit: number;
};

const isBalanceError = (message: string): boolean =>
    /insufficient|balance/i.test(message);

export default function InvestmentPlanCheckout({
    planId,
}: InvestmentPlanCheckoutProps) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [subscribeError, setSubscribeError] = useState("");
    const [balanceRejects, setBalanceRejects] = useState(false);
    const [result, setResult] = useState<SubscriptionOutcome | null>(null);

    const plansQuery = useQuery({
        queryKey: planQueryKeys.plans,
        queryFn: getPlans,
        enabled: planId != null,
        refetchOnWindowFocus: false,
    });

    const balanceQuery = useQuery({
        queryKey: depositQueryKeys.availableBalance,
        queryFn: getAvailableBalance,
        enabled: planId != null,
        refetchOnWindowFocus: false,
    });

    const subscribeMutation = useMutation({
        mutationFn: subscribeToPlan,
        onMutate: () => setSubscribeError(""),
        onSuccess: (action) => {
            if (!action.success) {
                setSubscribeError(action.error);
                // The balance can change between render and submit, so treat a
                // backend balance rejection as an authoritative insufficient
                // state rather than a generic failure.
                if (isBalanceError(action.error)) setBalanceRejects(true);
                return;
            }
            setResult({
                subscription: action.data,
                balanceAtSubmit: balanceQuery.data ?? 0,
            });
            queryClient.invalidateQueries({
                queryKey: subscriptionQueryKeys.subscriptions,
            });
            queryClient.invalidateQueries({
                predicate: (query) => isAvailableBalanceKey(query.queryKey),
            });
            queryClient.invalidateQueries({ queryKey: planQueryKeys.plans });
        },
        onError: (error: unknown) => setSubscribeError(extractErrorMessage(error)),
    });

    if (planId == null) {
        return (
            <ContentWrapper>
                <Stack spacing={3}>
                    <CheckoutHeader />
                    <EmptyState
                        title={LOAD_ERROR_TITLE}
                        description={LOAD_ERROR_DESCRIPTION}
                        action={
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    router.push(PATHS.dashboard.investmentplans)
                                }
                            >
                                {BACK_LABEL}
                            </Button>
                        }
                    />
                </Stack>
            </ContentWrapper>
        );
    }

    if (result) {
        return (
            <ContentWrapper>
                <Stack spacing={3}>
                    <SubscriptionSuccess
                        planTitle={result.subscription.plan_title}
                        investedAmount={toNumber(
                            result.subscription.invested_amount
                        )}
                        remainingBalance={
                            result.balanceAtSubmit -
                            toNumber(result.subscription.invested_amount)
                        }
                    />
                </Stack>
            </ContentWrapper>
        );
    }

    const plans = plansQuery.data?.plans ?? [];
    const plan = plans.find((candidate) => candidate.id === planId) ?? null;
    const planCost = plan ? toNumber(plan.min_amount) : 0;
    const availableBalance = balanceQuery.data;
    const remaining = (availableBalance ?? 0) - planCost;
    const sufficient = !balanceRejects && remaining >= 0;

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <CheckoutHeader />

                {plansQuery.isLoading && <LoadingState height={120} lines={2} />}

                {plansQuery.isError && (
                    <EmptyState
                        title={LOAD_ERROR_TITLE}
                        description={LOAD_ERROR_DESCRIPTION}
                        action={
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    router.push(PATHS.dashboard.investmentplans)
                                }
                            >
                                {BACK_LABEL}
                            </Button>
                        }
                    />
                )}

                {!plansQuery.isLoading && !plansQuery.isError && !plan && (
                    <EmptyState
                        title={LOAD_ERROR_TITLE}
                        description={LOAD_ERROR_DESCRIPTION}
                        action={
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    router.push(PATHS.dashboard.investmentplans)
                                }
                            >
                                {BACK_LABEL}
                            </Button>
                        }
                    />
                )}

                {plan && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Stack spacing={3}>
                                <SelectedPlanCard plan={plan} />

                                <BalanceBreakdown
                                    planCost={planCost}
                                    availableBalance={availableBalance}
                                    loading={balanceQuery.isLoading}
                                    stale={balanceRejects}
                                />

                                {balanceQuery.isError && (
                                    <Alert severity="error" variant="outlined">
                                        We could not load your available balance.
                                        <Button
                                            size="small"
                                            color="inherit"
                                            onClick={() => balanceQuery.refetch()}
                                            sx={{ ml: 1 }}
                                        >
                                            Retry
                                        </Button>
                                    </Alert>
                                )}

                                <ConfirmSubscription
                                    planCost={planCost}
                                    remaining={remaining}
                                    sufficient={sufficient}
                                    submitting={subscribeMutation.isPending}
                                    error={subscribeError}
                                    onConfirm={() =>
                                        subscribeMutation.mutate({
                                            plan_id: plan.id,
                                            amount: planCost,
                                        })
                                    }
                                />
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }}>
                            <OrderSummary
                                plan={plan}
                                planCost={planCost}
                                availableBalance={availableBalance}
                                loading={balanceQuery.isLoading}
                            />
                        </Grid>
                    </Grid>
                )}
            </Stack>
        </ContentWrapper>
    );
}
