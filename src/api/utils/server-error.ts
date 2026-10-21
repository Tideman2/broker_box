import type { AxiosError } from "axios";

export const extractServerErrorMessage = (
    error: unknown,
    fallback = "Something went wrong. Please try again."
): string => {
    if (!error || typeof error !== "object") return fallback;

    const data = (error as AxiosError).response?.data as
        | { detail?: unknown; result?: { message?: unknown } }
        | undefined;

    if (typeof data?.detail === "string" && data.detail) {
        return data.detail;
    }

    /**
     * FastAPI's default 422 body is `detail: [{ loc, msg, type }]` rather than
     * a string. Surface the first issue with its field name.
     */
    if (Array.isArray(data?.detail) && data.detail.length > 0) {
        const first = data.detail[0] as {
            msg?: unknown;
            loc?: unknown;
        };

        if (first && typeof first.msg === "string" && first.msg) {
            if (Array.isArray(first.loc)) {
                const field = first.loc[first.loc.length - 1];
                if (typeof field === "string" && field !== "body") {
                    return `${field}: ${first.msg}`;
                }
            }

            return first.msg;
        }
    }

    if (typeof data?.result?.message === "string" && data.result.message) {
        return data.result.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
};

/**
 * Keeps the server status alongside the message so callers can branch on the
 * contract (409 duplicate/pending, 404 missing) instead of matching strings.
 */
export const extractServerError = (
    error: unknown,
    fallback = "Something went wrong. Please try again."
): { error: string; status?: number } => {
    const status =
        error && typeof error === "object"
            ? (error as AxiosError).response?.status
            : undefined;

    return {
        error: extractServerErrorMessage(error, fallback),
        ...(status != null && { status }),
    };
};