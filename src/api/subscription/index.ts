import { getServerAxios } from "../server-axios";
import { subscriptionConfig } from "@/config/subscription";

import type {
    SubscribeRequest,
    SubscriptionResponse,
    SubscriptionsResponse,
} from "./types";

export const getSubscriptions = async (): Promise<SubscriptionsResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<SubscriptionsResponse>(
            subscriptionConfig.subscriptionsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
    }
};

export const subscribeToPlan = async (
    payload: SubscribeRequest
): Promise<SubscriptionResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.post<SubscriptionResponse>(
            subscriptionConfig.subscribeEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error subscribing to plan:", error);
        throw error;
    }
};

export const cancelSubscription = async (
    subscriptionId: number
): Promise<SubscriptionResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.post<SubscriptionResponse>(
            `${subscriptionConfig.cancelEndpoint}/${subscriptionId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        throw error;
    }
};
