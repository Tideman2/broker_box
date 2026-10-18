'use client';

import {
    useCallback,
    useMemo,
    useSyncExternalStore,
    type ReactNode,
} from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '@/app/theme';
import { useStoredPreference } from '@/contexts/useStoredPreference';

import type { ResolvedThemeMode, ThemeMode } from './context';
import { ThemeModeContext } from './context';

const STORAGE_KEY = 'themeMode';

const PREFERS_LIGHT_QUERY = '(prefers-color-scheme: light)';

const isThemeMode = (value: unknown): value is ThemeMode =>
    value === 'light' || value === 'dark' || value === 'system';

/**
 * Dark is the fallback rather than the OS preference, because the server and
 * the first client render have to agree; the stored preference and the OS
 * setting take over immediately after hydration.
 */
const DEFAULT_MODE: ThemeMode = 'dark';
const DEFAULT_SYSTEM_MODE: ResolvedThemeMode = 'dark';

/**
 * `prefers-color-scheme` is an external store too, so following the OS stays
 * live without an effect that has to set state when it changes.
 */
const subscribeToSystemMode = (onChange: () => void): (() => void) => {
    if (typeof window.matchMedia !== 'function') return () => { };

    const query = window.matchMedia(PREFERS_LIGHT_QUERY);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
};

const getSystemMode = (): ResolvedThemeMode => {
    if (typeof window.matchMedia !== 'function') return DEFAULT_SYSTEM_MODE;

    return window.matchMedia(PREFERS_LIGHT_QUERY).matches ? 'light' : 'dark';
};

const getServerSystemMode = (): ResolvedThemeMode => DEFAULT_SYSTEM_MODE;

/**
 * Owns the MUI theme. Mounted once in `app/providers`, above everything that
 * renders, so the whole app can read the mode and format against it.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useStoredPreference<ThemeMode>(
        STORAGE_KEY,
        isThemeMode,
        DEFAULT_MODE
    );

    const systemMode = useSyncExternalStore(
        subscribeToSystemMode,
        getSystemMode,
        getServerSystemMode
    );

    const resolvedMode: ResolvedThemeMode =
        mode === 'system' ? systemMode : mode;

    const toggleTheme = useCallback(() => {
        setMode(resolvedMode === 'dark' ? 'light' : 'dark');
    }, [resolvedMode, setMode]);

    const value = useMemo(
        () => ({ mode, resolvedMode, setMode, toggleTheme }),
        [mode, resolvedMode, setMode, toggleTheme]
    );

    return (
        <ThemeModeContext.Provider value={value}>
            <MuiThemeProvider
                theme={resolvedMode === 'dark' ? darkTheme : lightTheme}
            >
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeModeContext.Provider>
    );
}
