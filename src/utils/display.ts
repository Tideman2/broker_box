export type StatusTone = "success" | "error" | "info";

export const STATUS_LABELS: Record<string, string> = {
    pending: "Processing",
    confirmed: "Completed",
    rejected: "Failed",
};

export const STATUS_TONES: Record<string, StatusTone> = {
    pending: "info",
    confirmed: "success",
    rejected: "error",
};

export const statusLabel = (status: string): string =>
    STATUS_LABELS[status] ?? status;

export const statusTone = (status: string): StatusTone =>
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