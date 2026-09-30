import type { StatusTone } from "@/utils/display";

import type { RiskManagement } from "@/api/plan/types";
import type { SubscriptionStatus } from "@/api/subscription/types";

/**
 * The cancel flow must not be exposed until the backend blockers below are
 * resolved. The handler is commented out rather than deleted.
 *
 * 1. cancel_subscription() returns {"message", "id"} but the handler declared
 *    response_model=SubscriptionResponse, so FastAPI raised a 500
 *    ResponseValidationError on every call. It must return a built
 *    SubscriptionResponse instead.
 * 2. Funds are locked on subscribe (_lock_funds) and never released:
 *    _unlock_funds and _consume_lock_funds exist but are never called, so a
 *    cancelled subscription would strand the principal in wallet.locked.
 * 3. Subscriptions never mature: _complete_subscription is never called and
 *    there is no scheduler, so expiration_date is never acted on.
 *
 * Blockers 2 and 3 need a business decision on how principal is treated
 * before restoring the route. Flip this to true once it is back and correct.
 */
export const SUBSCRIPTION_CANCEL_ENABLED = false;

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

export const formatDuration = (days: number): string =>
    `${days} ${days === 1 ? "Day" : "Days"}`;

export const formatRoi = (roi: string): string => `${roi}%`;
