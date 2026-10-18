'use client';

import { createContext } from 'react';

/** The preference as chosen. `system` follows the OS setting. */
export type ThemeMode = 'light' | 'dark' | 'system';

/** What is actually rendered once `mode` has been resolved. */
export type ResolvedThemeMode = 'light' | 'dark';

type ThemeModeContextValue = {
    /** The stored preference, which may be `system`. */
    mode: ThemeMode;

    /** The rendered mode, i.e. `mode` with `system` resolved. */
    resolvedMode: ResolvedThemeMode;

    /** Persists a new preference. `system` is a valid choice. */
    setMode: (mode: ThemeMode) => void;

    /**
     * Flips between light and dark, dropping `system`. The navbar button has no
     * way to express "follow the OS", so toggling has to pick a side.
     */
    toggleTheme: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextValue>({
    mode: 'system',
    resolvedMode: 'dark',
    setMode: () => { },
    toggleTheme: () => { },
});
