"use server";

import { getCurrentUser } from "@/api/auth/server-side";

import type { User } from "@/api/auth/types";

export async function getSessionUser(): Promise<User | null> {
    try {
        return await getCurrentUser();
    } catch (error) {
        console.error("Failed to restore user session:", error);
        return null;
    }
}