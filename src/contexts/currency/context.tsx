'use client';

import {
    createContext,
    useCallback,
    useMemo,
    useSyncExternalStore,
    type ReactNode,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPreferences } from '@/app/actions/settings-actions';
import { settingsQueryKeys } from '@/api/react-query-keys';

import type { CurrencyDisplay } from '@/api/auth/types';

export const DEFAULT_CURRENCY: CurrencyDisplay = 'usd';

const STORAGE_KEY = 'currencyDisplay';

const isCurrencyDisplay = (value: unknown): value is CurrencyDisplay =>
    value === 'usd' || value === 'eur' || value === 'gbp';

/**
 * The stored preference is exposed as an external store instead of component
 * state, because it only exists in the browser: the server and the first client
 * render have to produce the same markup. `useSyncExternalStore` is the
 * supported shape for that — React renders the server value during hydration
 * and swaps in the stored one immediately afterwards, with no effect that has to
 * set state.
 */
const listeners = new Set<() => void>();

const subscribeToCurrency = (onChange: () => void): (() => void) => {
    listeners.add(onChange);
    return () => {
        listeners.delete(onChange);
    };
};

const getStoredCurrency = (): CurrencyDisplay => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return isCurrencyDisplay(stored) ? stored : DEFAULT_CURRENCY;
    } catch {
        // Storage can be blocked; the server value still applies.
        return DEFAULT_CURRENCY;
    }
};

const getServerCurrency = (): CurrencyDisplay => DEFAULT_CURRENCY;

const rememberCurrency = (value: CurrencyDisplay): void => {
    try {
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // Storage can be blocked; nothing depends on the write succeeding.
    }

    listeners.forEach((notify) => notify());
};

type CurrencyContextValue = {
    /** The currency every amount on the dashboard is displayed in. */
    currency: CurrencyDisplay;

    /**
     * Applies a new currency locally and persists it. Callers must only do
     * this once the server has confirmed the change, so the app never shows a
     * currency the API did not accept.
     */
    setCurrency: (value: CurrencyDisplay) => void;
};

export const CurrencyContext = createContext<CurrencyContextValue>({
    currency: DEFAULT_CURRENCY,
    setCurrency: () => { },
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const storedCurrency = useSyncExternalStore(
        subscribeToCurrency,
        getStoredCurrency,
        getServerCurrency
    );

    const preferencesQuery = useQuery({
        queryKey: settingsQueryKeys.preferences,
        queryFn: async () => {
            const preferences = await getPreferences();
            // The server answer wins, and is remembered so the next visit
            // renders the right currency before the request comes back.
            rememberCurrency(preferences.currency_display);
            return preferences;
        },
        refetchOnWindowFocus: false,
    });

    const currency = preferencesQuery.data?.currency_display ?? storedCurrency;

    const setCurrency = useCallback((value: CurrencyDisplay) => {
        rememberCurrency(value);
        queryClient.setQueryData(settingsQueryKeys.preferences, {
            currency_display: value,
        });
    }, [queryClient]);

    const value = useMemo(
        () => ({ currency, setCurrency }),
        [currency, setCurrency]
    );

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}
