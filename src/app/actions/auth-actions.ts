// src/app/actions/auth-actions.ts
"use server";

import { loginUser, LoginUserPayload } from "@/api/auth/server-side";
import { authConfig } from "@/config/auth";
import { setCookie, removeCookie } from "@/api/utils/cookies";

export async function handleServerLogin(payload: LoginUserPayload) {
    try {
        // 1. Fire your existing Axios instance STRICTLY on the Next.js server
        const data = await loginUser(payload);

        if (!data || !data.token) {
            return { success: false, error: "Invalid credentials or token missing." };
        }

        // 2. Lock the token into an encrypted httpOnly cookie container
        await setCookie(authConfig.sessionToken, data.token)

        return { success: true };
    } catch (error: any) {
        console.error("Server Action Login Failure:", error);
        // Return a clean error message back to the UI component boundary
        return {
            success: false,
            error: error.response?.data?.detail || error.message || "Authentication failed."
        };
    }
}


export async function logout() {
    await removeCookie(authConfig.sessionToken);
    return { success: true };
}