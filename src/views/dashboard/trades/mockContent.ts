export const TRADES_CONTENT = {
    title: "Trade Reports",
    subtitle:
        "Review every executed trade across your account, with filters for asset, side and period.",

    export: "Export CSV",
    exportFilename: "trades.csv",

    searchPlaceholder: "Search this page by asset or ID",
    searchLabel: "Search this page",

    instrumentLabel: "Asset",
    instrumentAll: "All assets",
    typeLabel: "Side",
    typeAll: "All trades",
    dateLabel: "Period",
    clearFilters: "Clear filters",

    tableTitle: "Trade History",

    showingRange: "Showing",
    showingOf: "to",
    pageLabel: "Page",
    prev: "Previous",
    next: "Next",

    stats: {
        totalTrades: "Total Trades",
        totalTradesCaption: "Executed across all instruments",
        winRate: "Win Rate",
        winRateCaption: "Share of profitable trades",
        netProfit: "Net Profit",
        netProfitCaption: "Realized across all trades",
    },

    errors: {
        statsTitle: "Trade statistics unavailable",
        statsDescription: "We could not load your trade overview.",
        tableTitle: "Trades unavailable",
        tableDescription: "We could not load your trade history.",
        retry: "Retry",
    },

    empty: {
        noTradesTitle: "No trades yet",
        noTradesDescription: "Executed trades will appear here as soon as you place them.",
        noMatchesTitle: "No matching trades",
        noMatchesDescription: "No trades on this page match your search.",
        noFilterMatchesTitle: "No trades match these filters",
        noFilterMatchesDescription: "Try widening the period, side or asset.",
    },
} as const;