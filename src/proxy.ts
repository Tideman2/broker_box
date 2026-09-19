// src/proxy.ts

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { checkAuthentication } from "@/proxy/auth";

export async function proxy(request: NextRequest) {

    const nonce = Buffer
        .from(crypto.randomUUID())
        .toString("base64");

    const csp = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' blob: data:",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "frame-src https://www.tradingview-widget.com",
        "form-action 'self'",
    ].join("; ");

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-nonce", nonce);

    const authResult = await checkAuthentication(request);

    let response: NextResponse;

    if (authResult.redirect) {
        response = NextResponse.redirect(
            new URL(authResult.redirect, request.url)
        );
    } else {
        response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    response.headers.set(
        "Content-Security-Policy",
        csp
    );

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}