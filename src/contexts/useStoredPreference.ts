'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * A client-only preference persisted in `localStorage`, exposed as a
 * `[value, setValue]` pair.
 *
 * It is modelled as an external store rather than component state because the
 * value only exists in the browser: the server and the first client render have
 * to produce the same markup. `useSyncExternalStore` is the supported shape for
 * that — React renders the server default during hydration and swaps in the
 * stored value immediately afterwards, with no effect that has to set state.
 *
 * @param isValid     Rejects values an older version of the app may have left
 *                    behind, so a stale or corrupted entry falls back safely.
 * @param defaultValue What the server should report, and what a browser without
 *                    the key reports.
 */
const subscriptions = new Map<string, Set<() => void>>();

const subscribe = (key: string, onChange: () => void): (() => void) => {
    const listeners = subscriptions.get(key) ?? new Set<() => void>();
    listeners.add(onChange);
    subscriptions.set(key, listeners);

    return () => {
        listeners.delete(onChange);
    };
};

const read = <T extends string>(
    key: string,
    isValid: (value: unknown) => value is T,
    defaultValue: T
): T => {
    try {
        const stored = window.localStorage.getItem(key);
        return isValid(stored) ? stored : defaultValue;
    } catch {
        // Storage can be blocked; the server default still applies.
        return defaultValue;
    }
};

export const useStoredPreference = <T extends string>(
    key: string,
    isValid: (value: unknown) => value is T,
    defaultValue: T
): [T, (value: T) => void] => {
    const value = useSyncExternalStore(
        useCallback((onChange: () => void) => subscribe(key, onChange), [key]),
        () => read(key, isValid, defaultValue),
        () => defaultValue
    );

    const setValue = useCallback(
        (next: T) => {
            try {
                window.localStorage.setItem(key, next);
            } catch {
                // Storage can be blocked; nothing depends on the write
                // succeeding, the caller keeps working from its own state.
            }

            subscriptions.get(key)?.forEach((notify) => notify());
        },
        [key]
    );

    return [value, setValue];
};
