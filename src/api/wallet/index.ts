import { getServerAxios } from "../server-axios";
import { walletConfig } from "@/config/wallet";

import type { MoneyFlowResponse } from "./types";

export const getMoneyFlow = async (): Promise<MoneyFlowResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<MoneyFlowResponse>(
            walletConfig.moneyFlowEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching money flow:", error);
        throw error;
    }
};
