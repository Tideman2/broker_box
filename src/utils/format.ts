export const toNumber = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
};

export const formatCurrency = (value: number, fractionDigits = 2): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: fractionDigits,
    }).format(value);

export const formatAmount = (value: unknown, fractionDigits = 2): string =>
    formatCurrency(toNumber(value), fractionDigits);

export const formatPercent = (value: number): string =>
    `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;