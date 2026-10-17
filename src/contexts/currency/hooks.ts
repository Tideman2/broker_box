import { useContext } from 'react';

import { CurrencyContext } from './context';
import { formatAmount, formatCurrency } from '@/utils/format';

import type { CurrencyDisplay } from '@/api/auth/types';

export const useCurrency = (): CurrencyDisplay =>
    useContext(CurrencyContext).currency;

/**
 * Amount formatting bound to the active display currency. Every component that
 * renders money should use this rather than importing `formatAmount` directly,
 * otherwise its figures ignore the user's currency preference.
 */
export const useFormatCurrency = () => {
    const currency = useCurrency();

    return {
        formatCurrency: (value: number, fractionDigits = 2) =>
            formatCurrency(value, fractionDigits, currency),
        formatAmount: (value: unknown, fractionDigits = 2) =>
            formatAmount(value, fractionDigits, currency),
    };
};
