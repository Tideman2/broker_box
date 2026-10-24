"use server";

import {
    loginUser,
    logoutUser,
    registerUser,
    requestPasswordReset,
    resetPassword,
    verifyOtp,
} from "@/api/auth/server-side";
import { extractServerError, extractServerErrorMessage } from "@/api/utils/server-error";
import { authConfig } from "@/config/auth";
import { setCookie, removeCookie } from "@/api/utils/cookies";

import type { AxiosError } from "axios";
import type { ActionResult } from "@/api/utils/action-result";
import type {
    ForgotPasswordPayload,
    ForgotPasswordResponse,
    LoginUserPayload,
    ResetPasswordPayload,
    ResetPasswordResponse,
    VerifyOtpPayload,
    VerifyOtpResponse,
} from "@/api/auth/server-side";
import type { RegistrationData } from "@/contexts/register/types";

type AuthActionResult =
    | { success: true }
    | { success: false; error: string; status?: number };

/**
 * TEMPORARY diagnostics for the production-only 429. Logs which upstream
 * answered, with the edge identifiers (`server`, `cf-ray`, `retry-after`) that
 * tell a backend rejection apart from a Cloudflare/Render rate limit.
 * Never logs the payload, because it contains the password.
 */
const logBackendFailure = (operation: string, error: unknown) => {
    const axiosError = error as AxiosError | undefined;
    const response = axiosError?.response;
    const headers = (response?.headers ?? {}) as Record<string, unknown>;

    console.error(`[auth:${operation}] backend request failed`, {
        baseURL: process.env.BACKEND_URL,
        method: axiosError?.config?.method,
        path: axiosError?.config?.url,
        status: response?.status,
        statusText: response?.statusText,
        contentType: headers["content-type"],
        server: headers["server"],
        cfRay: headers["cf-ray"],
        renderId: headers["rndr-id"],
        retryAfter: headers["retry-after"],
        rateLimit: headers["x-ratelimit-limit"],
        rateLimitRemaining: headers["x-ratelimit-remaining"],
        body:
            typeof response?.data === "string"
                ? response.data.slice(0, 300)
                : response?.data,
    });
};

export async function handleServerLogin(
    payload: LoginUserPayload
): Promise<AuthActionResult> {
    try {
        const data = await loginUser({
            email: payload.email.trim(),
            password: payload.password,
        });

        if (!data || !data.token) {
            return { success: false, error: "Invalid credentials or token missing." };
        }

        await setCookie(authConfig.sessionToken, data.token);
        await setCookie(authConfig.refreshToken, data.refresh_token);

        return { success: true };
    } catch (error) {
        logBackendFailure("login", error);
        const failure = extractServerError(error, "Authentication failed.");
        console.error("Server Action Login Failure:", failure);
        return { success: false, ...failure };
    }
}

export async function handleServerRegister(
    data: RegistrationData
): Promise<AuthActionResult> {
    try {
        const result = await registerUser(data);

        if (!result || !result.token) {
            return { success: false, error: "Registration failed. No session token returned." };
        }

        await setCookie(authConfig.sessionToken, result.token);
        await setCookie(authConfig.refreshToken, result.refresh_token);

        return { success: true };
    } catch (error) {
        const failure = extractServerError(
            error,
            "Registration failed. Please try again."
        );
        console.error("Server Action Register Failure:", failure);
        return { success: false, ...failure };
    }
}

export async function handleServerForgotPassword(
    payload: ForgotPasswordPayload
): Promise<ActionResult<ForgotPasswordResponse>> {
    try {
        const data = await requestPasswordReset(payload);
        return { success: true, data };
    } catch (error) {
        console.error("Server Action Forgot Password Failure:", error);
        return {
            success: false,
            error: extractServerErrorMessage(
                error,
                "Could not send the reset code. Please try again."
            ),
        };
    }
}

export async function handleServerVerifyOtp(
    payload: VerifyOtpPayload
): Promise<ActionResult<VerifyOtpResponse>> {
    try {
        const data = await verifyOtp(payload);
        return { success: true, data };
    } catch (error) {
        console.error("Server Action Verify OTP Failure:", error);
        return {
            success: false,
            error: extractServerErrorMessage(
                error,
                "Could not verify the code. Please try again."
            ),
        };
    }
}

export async function handleServerResetPassword(
    payload: ResetPasswordPayload
): Promise<ActionResult<ResetPasswordResponse>> {
    try {
        const data = await resetPassword(payload);
        return { success: true, data };
    } catch (error) {
        console.error("Server Action Reset Password Failure:", error);
        return {
            success: false,
            error: extractServerErrorMessage(
                error,
                "Could not reset your password. Please try again."
            ),
        };
    }
}

export async function logout() {
    console.log("Initiating server-side logout...");
    try {
        console.log("Attempting to log out server-side...");
        await logoutUser();
        console.log("Server Action Logout Success");
    } catch (error) {
        console.error("Server Action Logout Failure:", error);
    } finally {
        console.log("Removing session and refresh tokens from cookies...");
        await removeCookie(authConfig.sessionToken);
        await removeCookie(authConfig.refreshToken);
    }
    return { success: true };
}