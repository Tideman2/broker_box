"use server";

import {
    getPortfolioHoldings as fetchPortfolioHoldings,
    getPortfolioOverview as fetchPortfolioOverview,
    getPortfolioProfitLoss as fetchPortfolioProfitLoss,
    getTrades as fetchTrades,
    getTradesOverview as fetchTradesOverview,
} from "@/api/portfolio";

import type {
    GetTradesParams,
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
    TradeOverviewResponse,
    TradeResponse,
} from "@/api/portfolio/types";

export async function getPortfolioOverview(): Promise<PortfolioOverviewResponse> {
    return fetchPortfolioOverview();
}

export async function getPortfolioHoldings(): Promise<HoldingResponse[]> {
    return fetchPortfolioHoldings();
}

export async function getPortfolioProfitLoss(): Promise<PortfolioProfitLossResponse> {
    return fetchPortfolioProfitLoss();
}

export async function getTrades(
    params: GetTradesParams
): Promise<TradeResponse[]> {
    return fetchTrades(params);
}

export async function getTradesOverview(): Promise<TradeOverviewResponse> {
    return fetchTradesOverview();
}