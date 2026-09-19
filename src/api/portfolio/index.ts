import { getServerAxios } from "../server-axios";
import { portfolioConfig } from "@/config/portfolio";

import type {
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
} from "./types";

export const getPortfolioOverview = async (): Promise<PortfolioOverviewResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<PortfolioOverviewResponse>(
            portfolioConfig.overviewEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio overview:", error);
        throw error;
    }
};

export const getPortfolioHoldings = async (): Promise<HoldingResponse[]> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<HoldingResponse[]>(
            portfolioConfig.holdingsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio holdings:", error);
        throw error;
    }
};

export const getPortfolioProfitLoss = async (): Promise<PortfolioProfitLossResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<PortfolioProfitLossResponse>(
            portfolioConfig.profitLossEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio profit/loss:", error);
        throw error;
    }
};