"use client";

import { Button, Grid } from "@mui/material";

import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import PlanCard from "./PlanCard";

import {
    PLANS_EMPTY_DESCRIPTION,
    PLANS_EMPTY_TITLE,
    PLANS_ERROR_DESCRIPTION,
    PLANS_ERROR_TITLE,
    PLANS_RETRY_LABEL,
} from "../mockContent";

import type { PlanResponse } from "@/api/plan/types";

type PlanGridProps = {
    plans: PlanResponse[];
    /** Plan ids the user currently holds an active subscription for. */
    activePlanIds?: number[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PlanGrid({
    plans,
    activePlanIds,
    loading,
    error,
    onRetry,
}: PlanGridProps) {
    if (loading) {
        return (
            <Grid container spacing={3}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                        <LoadingState height={160} lines={1} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <EmptyState
                title={PLANS_ERROR_TITLE}
                description={PLANS_ERROR_DESCRIPTION}
                action={
                    <Button size="small" variant="outlined" onClick={onRetry}>
                        {PLANS_RETRY_LABEL}
                    </Button>
                }
            />
        );
    }

    if (plans.length === 0) {
        return (
            <EmptyState
                title={PLANS_EMPTY_TITLE}
                description={PLANS_EMPTY_DESCRIPTION}
            />
        );
    }

    return (
        <Grid container spacing={3}>
            {plans.map((plan) => (
                <Grid key={plan.id} size={{ xs: 12, md: 6, lg: 4 }}>
                    <PlanCard plan={plan} activePlanIds={activePlanIds} />
                </Grid>
            ))}
        </Grid>
    );
}
