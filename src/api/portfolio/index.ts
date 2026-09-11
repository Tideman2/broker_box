import { axios } from "@/api";
import { portfolioConfig } from "@/config/portfolio";

import type {
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
} from "./types";

// API CALLS
export const getPortfolioOverview = async (): Promise<PortfolioOverviewResponse> => {
    try {
        const response = await axios.get<PortfolioOverviewResponse>(
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
        const response = await axios.get<HoldingResponse[]>(
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
        const response = await axios.get<PortfolioProfitLossResponse>(
            portfolioConfig.profitLossEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio profit/loss:", error);
        throw error;
    }
};
