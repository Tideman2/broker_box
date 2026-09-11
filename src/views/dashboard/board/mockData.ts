export type PortfolioStat = {
    label: string;
    value: number;
    changePct: number;
    trend: 'up' | 'down';
};

export type PortfolioTimeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

export type PortfolioPoint = {
    date: string;
    value: number;
};

export type PortfolioAnalyticsData = Record<PortfolioTimeframe, PortfolioPoint[]>;

export type ActiveStrategyData = {
    market: string;
    strategy: string;
    invested: number;
    currentValue: number;
    progress: number;
    changePct: number;
};

export type MarketSentimentData = {
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    score: number;
    breakdown: Array<{ label: string; value: number }>;
};

export type Trade = {
    id: string;
    asset: string;
    type: 'Buy' | 'Sell';
    price: number;
    time: string;
    status: 'Executed' | 'Pending' | 'Failed';
};

export type FlowEntry = {
    label: string;
    amount: number;
    date: string;
};

export type FinancialFlowData = {
    balance: number;
    availableBalance: number;
    inflow: FlowEntry[];
    outflow: FlowEntry[];
};

export const portfolioStatsData: PortfolioStat[] = [
    { label: 'Total Balance', value: 24562, changePct: 4.6, trend: 'up' },
    { label: 'Active Investment', value: 18500, changePct: 2.1, trend: 'up' },
    { label: 'Profit / Loss', value: 4830, changePct: 18.7, trend: 'up' },
    { label: 'Available Balance', value: 6062, changePct: 1.2, trend: 'down' },
];

const buildSeries = (labels: string[], base: number): PortfolioPoint[] =>
    labels.map((label, index) => ({
        date: label,
        value: Math.round(base + Math.sin(index / 2.2) * base * 0.08 + index * base * 0.015),
    }));

const hourLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}:00`);
const dayLabels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

export const portfolioAnalyticsData: PortfolioAnalyticsData = {
    '1D': buildSeries(hourLabels, 24000),
    '1W': buildSeries(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 23800),
    '1M': buildSeries(dayLabels, 22000),
    '1Y': buildSeries(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 16000),
    ALL: buildSeries(['2023', '2024', '2025', '2026'], 9000),
};

export const activeStrategyData: ActiveStrategyData = {
    market: 'Nasdaq 100',
    strategy: 'Long-term Growth',
    invested: 12000,
    currentValue: 15240,
    progress: 75,
    changePct: 12.4,
};

export const marketSentimentData: MarketSentimentData = {
    sentiment: 'Bullish',
    score: 72,
    breakdown: [
        { label: 'Bullish', value: 68 },
        { label: 'Neutral', value: 22 },
        { label: 'Bearish', value: 10 },
    ],
};

export const recentTradesData: Trade[] = [
    { id: 't1', asset: 'BTC/USD', type: 'Buy', price: 64250.5, time: 'Sep 10, 14:32', status: 'Executed' },
    { id: 't2', asset: 'ETH/USD', type: 'Sell', price: 3421.8, time: 'Sep 10, 12:05', status: 'Executed' },
    { id: 't3', asset: 'AAPL', type: 'Buy', price: 227.62, time: 'Sep 09, 16:48', status: 'Pending' },
    { id: 't4', asset: 'EUR/USD', type: 'Sell', price: 1.1043, time: 'Sep 09, 09:15', status: 'Executed' },
    { id: 't5', asset: 'TSLA', type: 'Buy', price: 331.55, time: 'Sep 08, 15:30', status: 'Failed' },
    { id: 't6', asset: 'XAU/USD', type: 'Buy', price: 2612.9, time: 'Sep 08, 11:22', status: 'Executed' },
];

export const financialFlowData: FinancialFlowData = {
    balance: 24562.0,
    availableBalance: 6062.5,
    inflow: [
        { label: 'Deposit — Bank Transfer', amount: 5000, date: 'Sep 10' },
        { label: 'Strategy payout', amount: 1280.4, date: 'Sep 08' },
        { label: 'Deposit — Credit Card', amount: 2500, date: 'Sep 04' },
    ],
    outflow: [
        { label: 'Withdrawal — Bank Transfer', amount: 1200, date: 'Sep 11' },
        { label: 'Trading fees', amount: 64.2, date: 'Sep 09' },
        { label: 'Withdrawal — BTC', amount: 800, date: 'Sep 05' },
    ],
};