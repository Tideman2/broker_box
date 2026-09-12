import { axios } from "@/api";
import { withdrawConfig } from "@/config/withdraw";

import type {
    AddBankDestinationRequest,
    AddCryptoDestinationRequest,
    AssetResponse,
    DestinationResponse,
    UserWithdrawalRecordsResponse,
    WithdrawFundsRequest,
    WithdrawFundsResponse,
} from "./types";

export const getAssets = async (): Promise<AssetResponse[]> => {
    try {
        const response = await axios.get<AssetResponse[]>(
            withdrawConfig.assetsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
    }
};

export const getWithdrawDestinations = async (): Promise<DestinationResponse[]> => {
    try {
        const response = await axios.get<DestinationResponse[]>(
            withdrawConfig.destinationsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching withdraw destinations:", error);
        throw error;
    }
};

export const addBankDestination = async (
    payload: AddBankDestinationRequest
): Promise<DestinationResponse> => {
    try {
        const response = await axios.post<DestinationResponse>(
            withdrawConfig.bankAddEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error adding bank destination:", error);
        throw error;
    }
};

export const addCryptoDestination = async (
    payload: AddCryptoDestinationRequest
): Promise<DestinationResponse> => {
    try {
        const response = await axios.post<DestinationResponse>(
            withdrawConfig.cryptoAddEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error adding crypto destination:", error);
        throw error;
    }
};

export const getAvailableBalance = async (): Promise<number> => {
    try {
        const response = await axios.get<number>(
            withdrawConfig.availableBalanceEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching available balance:", error);
        throw error;
    }
};

export const withdrawFunds = async (
    payload: WithdrawFundsRequest
): Promise<WithdrawFundsResponse> => {
    try {
        const response = await axios.post<WithdrawFundsResponse>(
            withdrawConfig.withdrawEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting withdrawal:", error);
        throw error;
    }
};

export const getWithdrawalRecords = async (): Promise<
    UserWithdrawalRecordsResponse[]
> => {
    try {
        const response = await axios.get<UserWithdrawalRecordsResponse[]>(
            withdrawConfig.withdrawsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching withdrawal records:", error);
        throw error;
    }
};

export const getWithdrawalDetail = async (
    id: number
): Promise<WithdrawFundsResponse> => {
    try {
        const response = await axios.get<WithdrawFundsResponse>(
            `${withdrawConfig.withdrawalDetailEndpoint}/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching withdrawal detail:", error);
        throw error;
    }
};
