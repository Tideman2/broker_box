export type MoneyFlowType =
    | "DEPOSIT"
    | "WITHDRAWAL"
    | "SUBSCRIPTION_INVESTMENT"
    | "SUBSCRIPTION_PAYOUT";

export type MoneyFlowDirection = "IN" | "OUT";

/**
 * A settled wallet movement. `id` is only unique within `type`, so React keys
 * must combine both. `amount` is a decimal string and `occurred_at` is a UTC
 * ISO timestamp that has to be converted to local time for display.
 */
export type MoneyFlowItem = {
    id: number;
    type: MoneyFlowType;
    direction: MoneyFlowDirection;
    amount: string;
    /** Null for subscription rows, which are denominated in the wallet unit. */
    asset_symbol: string | null;
    status: string;
    occurred_at: string;
};

export type MoneyFlowResponse = {
    money_in: MoneyFlowItem[];
    money_out: MoneyFlowItem[];
};
