export type PortfolioStat = {
    label: string;
    value: number;
    changePct?: number;
    trend?: 'up' | 'down';
};

export type PortfolioTimeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

export type PortfolioPoint = {
    date: string;
    value: number;
};

export type PortfolioAnalyticsData = Record<PortfolioTimeframe, PortfolioPoint[]>;

export type MarketSentimentData = {
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    score: number;
    breakdown: Array<{ label: string; value: number }>;
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

export const marketSentimentData: MarketSentimentData = {
    sentiment: 'Bullish',
    score: 72,
    breakdown: [
        { label: 'Bullish', value: 68 },
        { label: 'Neutral', value: 22 },
        { label: 'Bearish', value: 10 },
    ],
};

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