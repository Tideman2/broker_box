export const portfolioQueryKeys = {
    overview: ["portfolio", "overview"] as const,
    holdings: ["portfolio", "holdings"] as const,
    profitLoss: ["portfolio", "profit-loss"] as const,
};

export const withdrawQueryKeys = {
    assets: ["withdraw", "assets"] as const,
    destinations: ["withdraw", "destinations"] as const,
    availableBalance: ["withdraw", "available-balance"] as const,
    withdraws: ["withdraw", "withdraws"] as const,
    withdrawal: (id: number) => ["withdraw", "withdrawal", id] as const,
};
