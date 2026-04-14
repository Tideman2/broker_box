'use client';

import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeModeContext } from '@/contexts/theme/context';
import { QueryProvider } from '@/contexts/react-query';
import { RegisterProvider } from '@/contexts/register/context';

interface ClientProvidersProps {
    children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    const [muiDarkTheme, setMuiDarkTheme] = useState(true);

    const toggleTheme = () => {
        setMuiDarkTheme(prev => !prev);
    };

    return (
        <QueryProvider>
            <AppRouterCacheProvider options={{ key: 'css' }}>
                <RegisterProvider>
                    <ThemeModeContext.Provider value={{ toggleTheme }}>
                        <ThemeProvider theme={muiDarkTheme ? darkTheme : lightTheme}>
                            <CssBaseline />
                            {children}
                        </ThemeProvider>
                    </ThemeModeContext.Provider>
                </RegisterProvider>
            </AppRouterCacheProvider>
        </QueryProvider>
    );
}
