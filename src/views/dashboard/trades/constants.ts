import type { TradeType } from "@/api/portfolio/types";

export const TRADES_PAGE_LIMIT = 10;

export const TRADE_HEAD_CELLS = [
    "Asset",
    "Type",
    "Quantity",
    "Price",
    "Total Value",
    "Date",
];

export const TRADE_TYPE_OPTIONS: Array<{ value: TradeType; label: string }> = [
    { value: "BUY", label: "Buy" },
    { value: "SELL", label: "Sell" },
];

/** `null` means "all time" and is omitted from the request entirely. */
export const DATE_RANGE_OPTIONS: Array<{ value: number | null; label: string }> = [
    { value: null, label: "All time" },
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last 30 days" },
    { value: 90, label: "Last 90 days" },
];

export type TradesEmptyMode =
    | "no-trades"
    | "no-matches"
    | "no-filter-matches";