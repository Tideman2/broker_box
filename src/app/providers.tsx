'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import { QueryProvider } from '@/contexts/react-query';
import { RegisterProvider } from '@/contexts/register/context';
import { ThemeProvider } from '@/contexts/theme/provider';

interface ClientProvidersProps {
    children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <QueryProvider>
            <AppRouterCacheProvider options={{ key: 'css' }}>
                <RegisterProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </RegisterProvider>
            </AppRouterCacheProvider>
        </QueryProvider>
    );
}
