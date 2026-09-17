// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authConfig } from "./config/auth";
import { getServerAxios } from "./api/server-axios";

export async function middleware(request: NextRequest) {
    // Extract the secure cookie token straight from the incoming HTTP request header
    const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
    console.log(isAuthRoute)
    try {
        const serverAxios = await getServerAxios();
        console.log(isDashboardRoute)
        const response = await serverAxios.get(
            authConfig.profileEndpoint
        );
        // Profile succeeded = authenticated

        if (isAuthRoute) {
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            );
        }

        return NextResponse.next();

    } catch (err) {

        // Profile failed = unauthenticated
        if (isDashboardRoute) {
            const loginUrl = new URL("/auth/login", request.url);

            // loginUrl.searchParams.set(
            //     "callbackUrl",
            //     request.nextUrl.pathname
            // );

            return NextResponse.redirect(loginUrl);
        }

        // Not authenticated, but they're already on
        // an auth/public route.
        return NextResponse.next();
    }
}

// Ensure the middleware runs only on core routing domains, avoiding static images/assets
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/login",
        "/auth/register"
    ],
};
