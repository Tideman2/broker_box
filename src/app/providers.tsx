'use client';

import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { ThemeModeContext } from '@/contexts/theme/context';
import { QueryProvider } from '@/contexts/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

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
                <ThemeModeContext.Provider value={{ toggleTheme }}>
                    <ThemeProvider theme={muiDarkTheme ? darkTheme : lightTheme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </ThemeModeContext.Provider>
            </AppRouterCacheProvider>
        </QueryProvider>
    );
}
