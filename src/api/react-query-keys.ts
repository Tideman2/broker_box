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

export const planQueryKeys = {
    plans: ["plan", "plans"] as const,
};

export const subscriptionQueryKeys = {
    subscriptions: ["subscription", "subscriptions"] as const,
};

/**
 * The available balance is served once by GET /wallet/available but is cached
 * under a separate key per feature. After any mutation that moves money, use
 * this predicate so every copy refreshes without each page knowing about the
 * others.
 */
export const isAvailableBalanceKey = (queryKey: readonly unknown[]): boolean =>
    queryKey.includes("available-balance");
