"use server";

import {
    cancelSubscription as fetchCancelSubscription,
    getSubscriptions as fetchGetSubscriptions,
    getSubscriptionSummary as fetchGetSubscriptionSummary,
    subscribeToPlan as fetchSubscribeToPlan,
} from "@/api/subscription";
import { extractServerErrorMessage } from "@/api/utils/server-error";

import type {
    SubscribeRequest,
    SubscriptionResponse,
    SubscriptionsResponse,
    SubscriptionSummary,
} from "@/api/subscription/types";
import type { ActionResult } from "@/api/utils/action-result";

export async function getSubscriptions(): Promise<SubscriptionsResponse> {
    return fetchGetSubscriptions();
}

export async function getSubscriptionSummary(): Promise<SubscriptionSummary[]> {
    return fetchGetSubscriptionSummary();
}

export async function subscribeToPlan(
    payload: SubscribeRequest
): Promise<ActionResult<SubscriptionResponse>> {
    try {
        const data = await fetchSubscribeToPlan(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}

export async function cancelSubscription(
    subscriptionId: number
): Promise<ActionResult<SubscriptionResponse>> {
    try {
        const data = await fetchCancelSubscription(subscriptionId);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}
