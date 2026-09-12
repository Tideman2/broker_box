import { formatCurrency } from "@/utils/format";

import type { DestinationResponse, WithdrawStatus } from "@/api/withdraw/types";

export type StatusTone = "success" | "error" | "info";

export const toNumber = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
};

export const formatAmount = (value: unknown, fractionDigits = 2): string =>
    formatCurrency(toNumber(value), fractionDigits);

export const STATUS_LABELS: Record<WithdrawStatus, string> = {
    pending: "Processing",
    confirmed: "Completed",
    rejected: "Failed",
};

export const STATUS_TONES: Record<WithdrawStatus, StatusTone> = {
    pending: "info",
    confirmed: "success",
    rejected: "error",
};

export const statusLabel = (status: WithdrawStatus): string =>
    STATUS_LABELS[status] ?? status;

export const statusTone = (status: WithdrawStatus): StatusTone =>
    STATUS_TONES[status] ?? "info";

export const truncateAddress = (address: string, head = 8, tail = 4): string => {
    if (address.length <= head + tail) return address;
    return `${address.slice(0, head)}...${address.slice(-tail)}`;
};

export const formatDate = (value: string | null | undefined): string => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const destinationSubtitle = (destination: DestinationResponse): string => {
    if (destination.type === "BANK") {
        const parts = [destination.bank_name, destination.account_name].filter(
            Boolean
        );
        return parts.join(" · ") || "Bank destination";
    }
    const symbol = destination.asset_symbol;
    const address = destination.address;
    if (symbol && address) return `${symbol} · ${truncateAddress(address)}`;
    return address ?? "Crypto destination";
};

type ErrorLike = Record<string, unknown>;

export const extractErrorMessage = (
    error: unknown,
    fallback = "Something went wrong. Please try again."
): string => {
    if (!error || typeof error !== "object") return fallback;
    const err = error as ErrorLike;
    const data =
        typeof err.data === "object" && err.data ? (err.data as ErrorLike) : err;
    const result =
        typeof data.result === "object" && data.result
            ? (data.result as ErrorLike)
            : null;
    if (result && typeof result.message === "string" && result.message) {
        return result.message;
    }
    if (typeof data.message === "string" && data.message) return data.message;
    return fallback;
};