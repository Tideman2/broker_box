import { getServerAxios } from "../server-axios";
import { portfolioConfig } from "@/config/portfolio";

import type {
    GetTradesParams,
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
    TradeOverviewResponse,
    TradeResponse,
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

export const getTrades = async (
    params: GetTradesParams
): Promise<TradeResponse[]> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<TradeResponse[]>(
            portfolioConfig.tradesEndpoint,
            {
                params: {
                    ...(params.instrument_id != null && {
                        instrument_id: params.instrument_id,
                    }),
                    ...(params.type != null && { type: params.type }),
                    ...(params.days != null && { days: params.days }),
                    limit: params.limit,
                    offset: params.offset,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching trades:", error);
        throw error;
    }
};

export const getTradesOverview =
    async (): Promise<TradeOverviewResponse> => {
        try {
            const server = await getServerAxios();
            const response = await server.get<TradeOverviewResponse>(
                portfolioConfig.tradesOverviewEndpoint
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching trades overview:", error);
            throw error;
        }
    };