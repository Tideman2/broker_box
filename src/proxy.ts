// src/proxy.ts

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { checkAuthentication } from "@/proxy/auth";

export async function proxy(request: NextRequest) {

    const nonce = Buffer
        .from(crypto.randomUUID())
        .toString("base64");

    const isDev = process.env.NODE_ENV === "development";

    /**
     * `'strict-dynamic'` is required in production so the nonce trust given to
     * Next's bootstrap propagates to the chunks it loads. React only needs
     * `'unsafe-eval'` in development for enhanced debugging.
     */
    const scriptSrc = [
        "'self'",
        `'nonce-${nonce}'`,
        "'strict-dynamic'",
        ...(isDev ? ["'unsafe-eval'"] : []),
    ].join(" ");

    const csp = [
        "default-src 'self'",
        `script-src ${scriptSrc}`,
        // Emotion/MUI injects styles at runtime, so inline styles must stay allowed.
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' blob: data:",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "frame-src https://www.tradingview-widget.com",
        "form-action 'self'",
        ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join("; ");

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-nonce", nonce);
    /**
     * Next.js only extracts the nonce and attaches it to its scripts when the
     * policy is present on the request headers. Setting it on the response
     * alone leaves the rendered inline scripts nonce-less and blocked.
     */
    requestHeaders.set("Content-Security-Policy", csp);

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