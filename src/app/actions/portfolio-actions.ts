"use server";

import {
    getPortfolioHoldings as fetchPortfolioHoldings,
    getPortfolioOverview as fetchPortfolioOverview,
    getPortfolioProfitLoss as fetchPortfolioProfitLoss,
} from "@/api/portfolio";

import type {
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
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