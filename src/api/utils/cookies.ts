// src/utils/cookies.ts
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from "next/headers";

export const getCookie = async (
    key: string
): Promise<RequestCookie | undefined> => {
    const cookieStore = await cookies();

    return cookieStore.get(key);
};

export const getCookieValue = async (
    key: string
): Promise<string | undefined> => {
    const cookieStore = await cookies();

    return cookieStore.get(key)?.value;
};

export const setCookie = async (
    key: string,
    value: string,
    only_url?: string
): Promise<void> => {
    const cookieStore = await cookies();

    cookieStore.set(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: only_url || "/"
    });
};

export const removeCookie = async (
    key: string
): Promise<void> => {
    const cookieStore = await cookies();

    cookieStore.delete(key);
};