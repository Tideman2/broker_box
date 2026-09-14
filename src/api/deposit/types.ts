export type { AssetResponse } from "@/api/types";

export type DepositStatus = "pending" | "confirmed" | "rejected";

export const PAYMENT_METHOD_CRYPTO = 1;

export type DepositResponse = {
    id: number;
    payment_method: string;
    asset: string;
    amount: number;
    status: string;
    date: string;
};

export type DepositFundsRequest = {
    deposit: {
        amount: number;
        asset_id: number;
        payment_method: number;
    };
};

export type DepositFundsResponse = {
    id: number;

    amount: number;
    status: DepositStatus;

    created_at: string;
    confirmed_at: string | null;

    asset_id: number;
    asset_symbol: string;
    asset_name: string;

    payment_method_id: number;
    payment_method_name: string;
    payment_method_type: string;

    bank_name: string | null;
    account_name: string | null;
    account_number: string | null;
};