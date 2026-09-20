import { getServerAxios } from "../server-axios";
import { depositConfig } from "@/config/deposit";

import type { AssetResponse, DepositFundsRequest, DepositFundsResponse, DepositResponse } from "./types";

export const getAssets = async (): Promise<AssetResponse[]> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<AssetResponse[]>(
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
        const server = await getServerAxios();
        const response = await server.get<number>(
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
        const server = await getServerAxios();
        const response = await server.get<DepositResponse[]>(
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
        const server = await getServerAxios();
        const response = await server.post<DepositFundsResponse>(
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
        const server = await getServerAxios();
        const response = await server.get<DepositFundsResponse>(
            `${depositConfig.depositDetailEndpoint}/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching deposit detail:", error);
        throw error;
    }
};