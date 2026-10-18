import { useCallback, useContext } from 'react';

import { CurrencyContext } from './context';
import { formatAmount, formatCurrency } from '@/utils/format';

import type { CurrencyContextValue } from './context';

export const useCurrency = (): CurrencyContextValue =>
    useContext(CurrencyContext);

/**
 * Amount formatting bound to the active display currency. Every component that
 * renders money should use this rather than importing `formatAmount` directly,
 * otherwise its figures ignore the user's currency preference.
 *
 * Both functions are memoized, so a component that formats inside a `useMemo`
 * only has to list them as dependencies — the identity only changes when the
 * currency itself changes.
 */
export const useFormatCurrency = () => {
    const { currency } = useCurrency();

    const formatCurrencyValue = useCallback(
        (value: number, fractionDigits = 2) =>
            formatCurrency(value, fractionDigits, currency),
        [currency]
    );

    const formatAmountValue = useCallback(
        (value: unknown, fractionDigits = 2) =>
            formatAmount(value, fractionDigits, currency),
        [currency]
    );

    return {
        formatCurrency: formatCurrencyValue,
        formatAmount: formatAmountValue,
    };
};
