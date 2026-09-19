// src/proxy/auth.ts

import type { NextRequest } from "next/server";

import { authConfig } from "@/config/auth";
import { getServerAxios } from "@/api/server-axios";

export async function checkAuthentication(
    request: NextRequest
) {
    const isDashboardRoute =
        request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthRoute =
        request.nextUrl.pathname.startsWith("/auth");

    try {
        const serverAxios = await getServerAxios();

        await serverAxios.get(authConfig.profileEndpoint);

        if (isAuthRoute) {
            return {
                redirect: "/dashboard",
            };
        }

        return {
            authenticated: true,
        };

    } catch {
        if (isDashboardRoute) {
            return {
                redirect: "/auth/login",
            };
        }

        return {
            authenticated: false,
        };
    }
}