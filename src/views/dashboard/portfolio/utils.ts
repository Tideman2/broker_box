import type {
    AssetAllocationItem,
    HoldingResponse,
    InstrumentProfitLossResult,
} from "@/api/portfolio/types";

export const riskLabelFromScore = (score: number): "Low" | "Moderate" | "High" => {
    if (score < 2.0) return "Low";
    if (score <= 3.5) return "Moderate";
    return "High";
};

const DIVERSIFICATION_STATUS: Record<string, "success" | "warning" | "error"> = {
    good: "success",
    moderate: "warning",
    poor: "error",
};

export const diversificationStatusColor = (
    label: string
): "success" | "warning" | "error" =>
    DIVERSIFICATION_STATUS[label.toLowerCase()] ?? "success";

export const performancePercent = (profitLoss: number, costBasis: number): number =>
    costBasis === 0 ? 0 : (profitLoss / costBasis) * 100;

export const performanceByInstrument = (
    instruments: InstrumentProfitLossResult[]
): Map<number, number> => {
    const map = new Map<number, number>();
    for (const item of instruments) {
        if (item.instrument_id != null) {
            map.set(
                item.instrument_id,
                performancePercent(item.total_profit_loss, item.remaining_cost_basis)
            );
        }
    }
    return map;
};

const AMOUNT_UNIT: Record<string, string> = {
    FOREX: "Lots",
    FOREXES: "Lots",
    COMMODITY: "oz",
    COMMODITIES: "oz",
    INDEX: "Units",
    INDICES: "Units",
};

export const amountWithUnit = (holding: HoldingResponse): string => {
    const unit = AMOUNT_UNIT[holding.category.toUpperCase()] ?? holding.symbol;
    return `${holding.net_quantity} ${unit}`;
};

export const allocationItemsWithPercent = (
    items: AssetAllocationItem[]
): Array<AssetAllocationItem & { value: number; percentage: number }> => {
    const total = items.reduce((sum, item) => sum + (item.value ?? 0), 0);
    return items.map((item) => {
        const value = item.value ?? 0;
        const percentage =
            item.percentage ?? (total > 0 ? (value / total) * 100 : 0);
        return { ...item, value, percentage };
    });
};

export type HoldingsRow = HoldingResponse & {
    amount: string;
    performance: number;
};

export const buildHoldingsCsv = (rows: HoldingsRow[]): string => {
    const header = [
        "Asset",
        "Category",
        "Amount",
        "Current Price",
        "Total Value",
        "Performance",
    ];
    const lines = rows.map((row) => [
        `${row.symbol} ${row.name}`.trim(),
        row.category,
        row.amount,
        row.current_price,
        row.instrument_value,
        `${row.performance.toFixed(2)}%`,
    ]);
    return [header, ...lines]
        .map((line) => line.map((cell) => `"${cell}"`).join(","))
        .join("\n");
};

export const downloadCsv = (filename: string, content: string): void => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};

export const timeAgo = (timestamp: number): string => {
    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
};
