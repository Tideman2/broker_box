import type { StatusTone } from "@/utils/display";

import type { RiskManagement } from "@/api/plan/types";
import type { SubscriptionStatus } from "@/api/subscription/types";

/**
 * POST /subscription/cancel/{id} settles immediately: open positions are
 * liquidated at the current price back into the subscription's pool, the pool
 * is returned to wallet.available, and the response comes back CANCELLED with a
 * pool of "0.00". The client must therefore refresh both the subscription list
 * and the available balance after a cancel.
 */
export const SUBSCRIPTION_CANCEL_ENABLED = true;

export const RISK_LABELS: Record<RiskManagement, string> = {
    STANDARD: "Standard Risk",
    ADVANCED_HEDGING: "Advanced Hedging",
    TAILORED_MULTI_LAYER: "Tailored Multi-Layer",
};

/**
 * Subscription statuses are UPPERCASE, but the shared StatusPill maps only the
 * lowercase deposit statuses, so these are normalized here rather than by
 * editing STATUS_TONES, which the deposit table relies on.
 */
export const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
    PENDING: "Pending",
    ACTIVE: "Active",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    FAILED: "Failed",
};

export const SUBSCRIPTION_STATUS_TONES: Record<SubscriptionStatus, StatusTone> =
    {
        PENDING: "info",
        ACTIVE: "success",
        COMPLETED: "success",
        CANCELLED: "error",
        FAILED: "error",
    };

/** A live subscription is one that is running or about to start. */
export const ACTIVE_SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
    "ACTIVE",
    "PENDING",
];

/**
 * Cancel is rejected with 401 for anything that is not ACTIVE, including a
 * PENDING one, so the cancel affordance is gated separately from the list
 * above rather than derived from it.
 */
export const CANCELLABLE_STATUSES: SubscriptionStatus[] = ["ACTIVE"];

/** Losses render as errors so a red P/L is never mistaken for a gain. */
export const profitTone = (
    profitLoss: number
): Exclude<StatusTone, "info"> => (profitLoss < 0 ? "error" : "success");

export const formatDuration = (days: number): string =>
    `${days} ${days === 1 ? "Day" : "Days"}`;

export const formatRoi = (roi: string): string => `${roi}%`;
