// src/proxy/auth.ts

import type { NextRequest } from "next/server";

import { authConfig } from "@/config/auth";
import { getServerAxios } from "@/api/server-axios";
import { setCookie } from "@/api/utils/cookies";

export async function checkAuthentication(
    request: NextRequest
) {
    const serverAxios = await getServerAxios();
    const isDashboardRoute =
        request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthRoute =
        request.nextUrl.pathname.startsWith("/auth");

    try {

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
        const refreshToken = request.cookies.get(authConfig.refreshToken)?.value;

        if (!refreshToken) {
            if (isDashboardRoute) {
                return {
                    redirect: "/auth/login",
                };
            }

            return {
                authenticated: false,
            };
        }

        const newAccessTokenResponse = await serverAxios.post(authConfig.refreshTokenEndpoint, {
            token: refreshToken,
        });

        if (isDashboardRoute) {
            if (newAccessTokenResponse.status === 200 || newAccessTokenResponse.status === 201) {
                const newAccessToken = newAccessTokenResponse.data.token;
                await setCookie(authConfig.sessionToken, newAccessToken);
                console.log("New access token set in cookie:", newAccessToken);
                return {
                    authenticated: true,
                };
            }

            return {
                redirect: "/auth/login",
            };
        }

        return {
            authenticated: false,
        };
    }
}