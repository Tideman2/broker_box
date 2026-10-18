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
    /**
     * Spendable cash held inside this subscription. Subscribing moves the
     * amount from wallet.available into it, and cancelling or expiring returns
     * whatever is left. Serialized as a string because it is a Decimal.
     *
     * Optional for the same reason PlanResponse.is_recommended is: it was added
     * after the field's consumers, so a backend still on the previous contract
     * omits it rather than sending 0, and the UI must not invent a balance.
     */
    pool?: string;
    expiration_date: string;
    status: SubscriptionStatus;
    created_at: string;
};

export type SubscriptionsResponse = {
    subscriptions: SubscriptionResponse[];
};

/**
 * One row per ACTIVE subscription from GET /subscription/summary. All Decimal
 * fields are serialized as strings, so `profit_loss` can be negative ("-3.50")
 * and must go through `toNumber` before it is compared or colored.
 */
export type SubscriptionSummary = {
    subscription_id: number;
    /** The plan's invested amount, equal to SubscriptionResponse.invested_amount. */
    principal: string;
    /** Pool plus open positions marked to market. */
    current_value: string;
    /** current_value - principal. */
    profit_loss: string;
    /** profit_loss / principal * 100, as a plain percentage. */
    roi_percent: string;
    status: SubscriptionStatus;
};

export type SubscribeRequest = {
    plan_id: number;
    amount: number;
};
