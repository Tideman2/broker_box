export type SubscriptionStatus =
    | "PENDING"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED"
    | "FAILED";

export type SubscriptionResponse = {
    id: number;
    user_id: number;
    plan_id: number;
    plan_title: string;
    /** Serialized as a string because the backend field is a Decimal. */
    invested_amount: string;
    expiration_date: string;
    status: SubscriptionStatus;
    created_at: string;
};

export type SubscriptionsResponse = {
    subscriptions: SubscriptionResponse[];
};

export type SubscribeRequest = {
    plan_id: number;
    amount: number;
};
