export type AssetAllocationItem = {
    symbol: string;
    value: number;
    allocation_percentage: number;
};

export type PortfolioOverviewResponse = {
    portfolio_value: number;
    asset_allocation: AssetAllocationItem[];
    diversification_score: string;
    portfolio_risk_score: number;
    portfolio_risk_label: string;
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

export type TradeType = "BUY" | "SELL";

/**
 * The trades endpoint returns a bare list with no total count, so pagination
 * cannot report "of N". All numeric fields arrive as decimal strings and must
 * go through `toNumber` before arithmetic.
 */
export type TradeResponse = {
    transaction_id: number;
    instrument_id: number;
    symbol: string;
    name: string;
    type: TradeType;
    quantity: string;
    price: string;
    total_value: string;
    executed_at: string;
};

export type TradeOverviewResponse = {
    total_trades: number;
    win_rate: string;
    total_net_profit: string;
};

export type GetTradesParams = {
    instrument_id?: number;
    type?: TradeType;
    days?: number;
    limit: number;
    offset: number;
};
