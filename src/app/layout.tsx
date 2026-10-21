import type { Metadata } from "next";
import { connection } from "next/server";

import { GLOBAL_CONFIG } from "@/config/global";
import Providers from "./providers";

export const metadata: Metadata = {
  title: GLOBAL_CONFIG.site.name,
  description: GLOBAL_CONFIG.site.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Nonce-based CSP requires dynamic rendering: static HTML is generated at
   * build time, when no request nonce exists, and its scripts would be blocked.
   */
  await connection();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
