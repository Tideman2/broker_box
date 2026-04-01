import type { Metadata } from "next";

import "./globals.css";

import { GLOBAL_CONFIG } from "@/config/global";
import Providers from "./providers";

export const metadata: Metadata = {
  title: GLOBAL_CONFIG.site.name,
  description: GLOBAL_CONFIG.site.description,
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
