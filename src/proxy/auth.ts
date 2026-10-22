// src/proxy/auth.ts

import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import { authConfig } from "@/config/auth";
import { getServerAxios } from "@/api/server-axios";
import { setCookie } from "@/api/utils/cookies";

/**
 * Refresh slightly before expiry so a request cannot go out with a token that
 * expires while it is in flight.
 */
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

type AccessTokenPayload = {
    exp?: number;
};

type RefreshResponse = {
    token?: string;
};

/**
 * JWT `exp` is in Unix seconds; `Date.now()` is in milliseconds.
 */
const isAccessTokenFresh = (token?: string): boolean => {
    if (!token) return false;

    try {
        const { exp } = jwtDecode<AccessTokenPayload>(token);

        if (typeof exp !== "number") return false;

        return exp * 1000 - Date.now() > REFRESH_THRESHOLD_MS;
    } catch {
        return false;
    }
};

export async function checkAuthentication(
    request: NextRequest
) {
    const isDashboardRoute =
        request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthRoute =
        request.nextUrl.pathname.startsWith("/auth");

    const accessToken =
        request.cookies.get(authConfig.sessionToken)?.value;

    const refreshToken =
        request.cookies.get(authConfig.refreshToken)?.value;

    /**
     * Public routes do not need authentication. Inspect the token only to
     * report the session state; never call the backend just to gate a page.
     */
    if (!isDashboardRoute && !isAuthRoute) {
        return {
            authenticated: isAccessTokenFresh(accessToken),
        };
    }

    /**
     * A token with more than five minutes left is valid without a backend
     * round-trip. Everything else is refreshed below.
     */
    if (isAccessTokenFresh(accessToken)) {
        if (isAuthRoute) {
            return {
                redirect: "/dashboard",
            };
        }

        return {
            authenticated: true,
        };
    }

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

    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.post<RefreshResponse>(
            authConfig.refreshTokenEndpoint,
            {
                token: refreshToken,
            }
        );

        const newAccessToken = response.data?.token;

        if (!newAccessToken) {
            if (isDashboardRoute) {
                return {
                    redirect: "/auth/login",
                };
            }

            return {
                authenticated: false,
            };
        }

        await setCookie(authConfig.sessionToken, newAccessToken);

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
