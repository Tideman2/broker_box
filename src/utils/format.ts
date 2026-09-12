export const formatCurrency = (value: number, fractionDigits = 2): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: fractionDigits,
    }).format(value);

export const formatPercent = (value: number): string =>
    `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
