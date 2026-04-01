'use client';

import { useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton, styled } from '@mui/material';
import { Brightness7, Brightness2 } from '@mui/icons-material';
import { darkTheme, lightTheme } from './theme';
import { QueryProvider } from '@/contexts/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

interface ClientProvidersProps {
    children: React.ReactNode;
}

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function ClientProviders({ children }: ClientProvidersProps) {
    const [muiDarkTheme, setMuiDarkTheme] = useState(true);

    return (
        <QueryProvider>
            <AppRouterCacheProvider options={{ key: 'css' }}>
                <ThemeProvider theme={muiDarkTheme ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <ThemeToggleButton onClick={() => setMuiDarkTheme(!muiDarkTheme)}>
                        {muiDarkTheme ? <Brightness7 /> : <Brightness2 />}
                    </ThemeToggleButton>
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </QueryProvider>
    );
}
