"use server";

import {
    changePassword as fetchChangePassword,
    getCurrentUser,
    updateProfile as fetchUpdateProfile,
} from "@/api/auth/server-side";
import {
    getPreferences as fetchGetPreferences,
    updatePreferences as fetchUpdatePreferences,
} from "@/api/settings";
import { extractServerErrorMessage } from "@/api/utils/server-error";
import { removeCookie } from "@/api/utils/cookies";
import { authConfig } from "@/config/auth";

import type {
    ChangePasswordPayload,
    ChangePasswordResponse,
    Preferences,
    UpdateProfilePayload,
    User,
} from "@/api/auth/types";
import type { ActionResult } from "@/api/utils/action-result";

/**
 * Unlike `getSessionUser`, this throws so a failed read surfaces as an error
 * instead of looking like an empty profile.
 */
export async function getProfile(): Promise<User> {
    return getCurrentUser();
}

export async function getPreferences(): Promise<Preferences> {
    return fetchGetPreferences();
}

export async function updateProfile(
    payload: UpdateProfilePayload
): Promise<ActionResult<User>> {
    try {
        const data = await fetchUpdateProfile(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}

export async function updatePreferences(
    payload: Partial<Preferences>
): Promise<ActionResult<Preferences>> {
    try {
        const data = await fetchUpdatePreferences(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}

/**
 * A successful change revokes every session server-side, so the cookies are
 * cleared here and the client must route to login. On failure the session is
 * still valid, so nothing is cleared and the user stays signed in.
 */
export async function changePassword(
    payload: ChangePasswordPayload
): Promise<ActionResult<ChangePasswordResponse>> {
    try {
        const data = await fetchChangePassword(payload);
        await removeCookie(authConfig.sessionToken);
        await removeCookie(authConfig.refreshToken);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}
