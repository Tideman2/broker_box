import { toNumber } from "@/utils/format";
import { formatDate } from "@/utils/display";

import type { TradeResponse } from "@/api/portfolio/types";
import type { TradesEmptyMode } from "./constants";

/**
 * `formatPercent` signs positive values with a "+", which reads wrong on a win
 * rate, so the trades view formats percentages without a sign.
 */
export const plainPercent = (value: number, digits = 2): string =>
    `${value.toFixed(digits)}%`;

export const winRatePercent = (winRate: string): string =>
    plainPercent(toNumber(winRate));

export const executedAtParts = (executedAt: string): { date: string; time: string } => {
    const parsed = new Date(executedAt);
    if (Number.isNaN(parsed.getTime())) return { date: "—", time: "—" };

    return {
        date: formatDate(executedAt),
        time: parsed.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
};

/**
 * The trades endpoint has no text search parameter, so this only narrows the
 * page that is already loaded. Callers label it accordingly.
 */
export const matchesSearch = (trade: TradeResponse, query: string): boolean => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;

    return `${trade.symbol} ${trade.name} ${trade.transaction_id}`
        .toLowerCase()
        .includes(needle);
};

/**
 * The three empty states look identical but mean different things: the account
 * has never traded, this page has no rows matching the local search, or the
 * server-side filters excluded everything.
 */
export const resolveEmptyMode = (
    rowCount: number,
    pageCount: number,
    serverFiltered: boolean
): TradesEmptyMode => {
    if (rowCount > 0) return "no-trades";
    if (pageCount > 0) return "no-matches";
    return serverFiltered ? "no-filter-matches" : "no-trades";
};

export const buildTradesCsv = (rows: TradeResponse[]): string => {
    const header = [
        "Transaction ID",
        "Asset",
        "Side",
        "Quantity",
        "Price",
        "Total Value",
        "Executed At",
    ];

    const lines = rows.map((row) => [
        String(row.transaction_id),
        `${row.symbol} ${row.name}`.trim(),
        row.type,
        row.quantity,
        row.price,
        row.total_value,
        row.executed_at,
    ]);

    return [header, ...lines]
        .map((line) => line.map((cell) => `"${cell}"`).join(","))
        .join("\n");
};