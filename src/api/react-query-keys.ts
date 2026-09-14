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

export const depositQueryKeys = {
    assets: ["deposit", "assets"] as const,
    availableBalance: ["deposit", "available-balance"] as const,
    deposits: ["deposit", "deposits"] as const,
    depositById: (id: number) => ["deposit", "deposit", id] as const,
};
