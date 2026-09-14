export type { AssetResponse } from "@/api/types";

export type DestinationType = "BANK" | "CRYPTO";

export type DestinationResponse = {
    id: number;
    label: string;
    type: DestinationType;

    asset_id: number | null;
    asset_symbol: string | null;
    asset_name: string | null;
    address: string | null;

    bank_name: string | null;
    account_name: string | null;
    account_number: string | null;
};

export type BankDestinationDetails = {
    label: string;
    type: "BANK";
};

export type BankDestination = {
    bank_name: string;
    account_name: string;
    account_number: string;
};

export type AddBankDestinationRequest = {
    destination_details: BankDestinationDetails;
    bank_destination: BankDestination;
};

export type CryptoDestinationDetails = {
    label: string;
    type: "CRYPTO";
};

export type CryptoDestination = {
    asset_id: number;
    address: string;
};

export type AddCryptoDestinationRequest = {
    destination_details: CryptoDestinationDetails;
    crypto_destination: CryptoDestination;
};

export type WithdrawStatus = "pending" | "confirmed" | "rejected";

export type UserWithdrawalRecordsResponse = {
    id: number;
    amount: number;
    status: WithdrawStatus;
    created_at: string;
    asset_symbol: string;
    asset_name: string;
    destination_type: string;
};

export type WithdrawFundsRequest = {
    amount: number;
    destination_id: number;
};

export type WithdrawFundsResponse = {
    id: number;

    amount: number;
    status: WithdrawStatus;

    created_at: string;
    confirmed_at: string | null;

    asset_id: number;
    asset_symbol: string;
    asset_name: string;

    destination_id: number;
    destination_label: string;
    destination_type: string;

    address: string | null;

    bank_name: string | null;
    account_name: string | null;
    account_number: string | null;
};
