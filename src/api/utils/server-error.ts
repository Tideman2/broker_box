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

    if (typeof data?.result?.message === "string" && data.result.message) {
        return data.result.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
};