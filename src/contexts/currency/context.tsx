'use client';

import {
    createContext,
    useCallback,
    useMemo,
    type ReactNode,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPreferences } from '@/app/actions/settings-actions';
import { settingsQueryKeys } from '@/api/react-query-keys';
import { useStoredPreference } from '@/contexts/useStoredPreference';

import type { CurrencyDisplay } from '@/api/auth/types';

export const DEFAULT_CURRENCY: CurrencyDisplay = 'usd';

const STORAGE_KEY = 'currencyDisplay';

const isCurrencyDisplay = (value: unknown): value is CurrencyDisplay =>
    value === 'usd' || value === 'eur' || value === 'gbp';

export type CurrencyContextValue = {
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

/**
 * The preferences endpoint owns this value; the stored copy is only a fast
 * path so the first dashboard visit after a reload renders the right currency
 * before the request comes back.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const [storedCurrency, rememberCurrency] = useStoredPreference<CurrencyDisplay>(
        STORAGE_KEY,
        isCurrencyDisplay,
        DEFAULT_CURRENCY
    );

    const preferencesQuery = useQuery({
        queryKey: settingsQueryKeys.preferences,
        queryFn: async () => {
            const preferences = await getPreferences();
            // The server answer wins over whatever this device remembered.
            rememberCurrency(preferences.currency_display);
            return preferences;
        },
        refetchOnWindowFocus: false,
    });

    const currency = preferencesQuery.data?.currency_display ?? storedCurrency;

    const setCurrency = useCallback(
        (value: CurrencyDisplay) => {
            rememberCurrency(value);
            queryClient.setQueryData(settingsQueryKeys.preferences, {
                currency_display: value,
            });
        },
        [queryClient, rememberCurrency]
    );

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
