import { axios } from "@/api";
import { depositConfig } from "@/config/deposit";

import type { AssetResponse, DepositFundsRequest, DepositFundsResponse, DepositResponse } from "./types";

export const getAssets = async (): Promise<AssetResponse[]> => {
    try {
        const response = await axios.get<AssetResponse[]>(
            depositConfig.assetsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
    }
};

export const getAvailableBalance = async (): Promise<number> => {
    try {
        const response = await axios.get<number>(
            depositConfig.availableBalanceEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching available balance:", error);
        throw error;
    }
};

export const getDeposits = async (
    limit: number,
    offset: number
): Promise<DepositResponse[]> => {
    try {
        const response = await axios.get<DepositResponse[]>(
            depositConfig.depositsEndpoint,
            { params: { limit, offset } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching deposits:", error);
        throw error;
    }
};

export const depositFunds = async (
    payload: DepositFundsRequest
): Promise<DepositFundsResponse> => {
    try {
        const response = await axios.post<DepositFundsResponse>(
            depositConfig.depositEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting deposit:", error);
        throw error;
    }
};

export const getDepositDetail = async (
    id: number
): Promise<DepositFundsResponse> => {
    try {
        const response = await axios.get<DepositFundsResponse>(
            `${depositConfig.depositDetailEndpoint}/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching deposit detail:", error);
        throw error;
    }
};