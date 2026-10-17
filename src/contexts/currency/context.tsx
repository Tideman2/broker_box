'use client';

import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPreferences } from '@/app/actions/settings-actions';
import { settingsQueryKeys } from '@/api/react-query-keys';

import type { CurrencyDisplay } from '@/api/auth/types';

export const DEFAULT_CURRENCY: CurrencyDisplay = 'usd';

const STORAGE_KEY = 'currencyDisplay';

const isCurrencyDisplay = (value: unknown): value is CurrencyDisplay =>
    value === 'usd' || value === 'eur' || value === 'gbp';

/**
 * The stored preference is applied in an effect rather than read during render,
 * because the server and the first client render have to produce the same
 * markup for hydration to match.
 */
const readStoredCurrency = (): CurrencyDisplay => {
    if (typeof window === 'undefined') return DEFAULT_CURRENCY;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return isCurrencyDisplay(stored) ? stored : DEFAULT_CURRENCY;
    } catch {
        // Storage can be blocked; the server value still applies.
        return DEFAULT_CURRENCY;
    }
};

const writeStoredCurrency = (value: CurrencyDisplay): void => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // Storage can be blocked; nothing depends on this write succeeding.
    }
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
    const [currency, setCurrencyState] = useState<CurrencyDisplay>(DEFAULT_CURRENCY);

    const preferencesQuery = useQuery({
        queryKey: settingsQueryKeys.preferences,
        queryFn: getPreferences,
        refetchOnWindowFocus: false,
    });

    // Fast path: show the remembered value while the request is still in flight.
    useEffect(() => {
        setCurrencyState(readStoredCurrency());
    }, []);

    // Source of truth: whatever the server reports once it answers.
    useEffect(() => {
        const serverValue = preferencesQuery.data?.currency_display;
        if (serverValue) {
            setCurrencyState(serverValue);
            writeStoredCurrency(serverValue);
        }
    }, [preferencesQuery.data]);

    const setCurrency = useCallback((value: CurrencyDisplay) => {
        setCurrencyState(value);
        writeStoredCurrency(value);
    }, []);

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
