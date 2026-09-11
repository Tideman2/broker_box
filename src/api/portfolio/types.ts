// Backend contract types (snake_case). Mirror src/api/auth/types.ts conventions.

export type AssetAllocationItem = {
    category: string;
    value?: number;
    percentage?: number;
};

export type PortfolioOverviewResponse = {
    portfolio_value: number;
    asset_allocation: AssetAllocationItem[];
    diversification_score: string;
    portfolio_risk_score: number;
};

export type HoldingResponse = {
    instrument_id: number;
    symbol: string;
    name: string;
    category: string;
    current_price: number;
    total_buy: number;
    total_sell: number;
    net_quantity: number;
    instrument_value: number;
    portfolio_risk_label: string;
};

export type InstrumentProfitLossResult = {
    instrument_id: number | null;
    symbol: string | null;
    realized_profit: number;
    unrealized_profit: number;
    total_profit_loss: number;
    remaining_quantity: number;
    remaining_cost_basis: number;
};

export type PortfolioProfitLossResponse = {
    portfolio_realized_profit: number;
    portfolio_unrealized_profit: number;
    portfolio_total_profit_loss: number;
    instruments: InstrumentProfitLossResult[];
};
