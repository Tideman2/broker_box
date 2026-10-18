export const toNumber = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
};

/**
 * `currency` is the ISO code and accepts the lowercase form the preferences
 * API returns; it is upper-cased here because the spec only permits uppercase
 * in `Intl.NumberFormat` and stricter engines reject the lowercase form.
 */
export const formatCurrency = (
    value: number,
    fractionDigits = 2,
    currency = "USD"
): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumFractionDigits: fractionDigits,
    }).format(value);

export const formatAmount = (
    value: unknown,
    fractionDigits = 2,
    currency = "USD"
): string => formatCurrency(toNumber(value), fractionDigits, currency);

/** Up to two initials from a display name, e.g. "Jane Doe" -> "JD". */
export const formatInitials = (name: string): string =>
    name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

export const formatPercent = (value: number): string =>
    `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;