"use server";

import { loginUser, registerUser } from "@/api/auth/server-side";
import { extractServerErrorMessage } from "@/api/utils/server-error";
import { authConfig } from "@/config/auth";
import { setCookie, removeCookie } from "@/api/utils/cookies";

import type { LoginUserPayload } from "@/api/auth/server-side";
import type { RegistrationData } from "@/contexts/register/types";

type AuthActionResult =
    | { success: true }
    | { success: false; error: string };

export async function handleServerLogin(
    payload: LoginUserPayload
): Promise<AuthActionResult> {
    try {
        const data = await loginUser(payload);

        if (!data || !data.token) {
            return { success: false, error: "Invalid credentials or token missing." };
        }

        await setCookie(authConfig.sessionToken, data.token);

        return { success: true };
    } catch (error) {
        console.error("Server Action Login Failure:", error);
        return {
            success: false,
            error: extractServerErrorMessage(error, "Authentication failed."),
        };
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

        return { success: true };
    } catch (error) {
        console.error("Server Action Register Failure:", error);
        return {
            success: false,
            error: extractServerErrorMessage(error, "Registration failed. Please try again."),
        };
    }
}

export async function logout() {
    await removeCookie(authConfig.sessionToken);
    return { success: true };
}