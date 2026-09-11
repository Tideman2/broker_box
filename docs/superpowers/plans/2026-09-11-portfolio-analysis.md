# Portfolio Analysis Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the placeholder `/dashboard/portfolio` page into a real analytics page that renders backend-computed portfolio concepts (value, allocation, diversification, risk, P/L, holdings) using react-query for client-side caching.

**Architecture:** A new `src/api/portfolio/` module (config + types + fetchers, mirroring `src/api/auth/`) backed by three backend endpoints. A `'use client'` page component runs three parallel react-query queries and composes presentational sections (header, KPI stats, allocation donut, performance-growth placeholder, holdings table). Only presentational joins of backend-provided numbers happen client-side (e.g. performance % = pnl ÷ cost basis) — no portfolio math is re-derived.

**Tech Stack:** Next.js 16 / React 19 / MUI v7 (`sx`/Emotion), recharts v3, `@tanstack/react-query` v5, axios (shared instance in `src/api/index.ts`), pnpm.

**Spec:** `docs/superpowers/specs/2026-09-11-portfolio-analysis-design.md`

## Global Constraints

- Package manager is **pnpm** only. Never use npm/yarn.
- **No test framework exists.** TDD via a test runner is not used; per-task verification is `pnpm tsc --noEmit` and `pnpm lint`. Run `pnpm build` once in the final task.
- Path alias `@/*` → `./src/*`; use it for all imports.
- Endpoints live in a config module (`src/config/portfolio.ts`), never hardcoded in callers. Routes always via `PATHS` from `@/routes/paths`.
- The shared axios interceptor unwraps errors — callers receive `{ statusCode, result }`, not AxiosError. Success fetchers return `response.data`.
- Backend responses are snake_case; API contract types go in `src/api/portfolio/types.ts`.
- Do **not** recompute portfolio domain metrics (net quantity, instrument value, portfolio value, allocation %, risk score, FIFO P/L) client-side — the backend returns them.
- MUI styling via `sx` prop; reuse theme palette tokens (`primary.main`, `success.main`, `warning.main`, `error.main`, `text.secondary`, `divider`) and the shared `DashboardCard`.
- Empty / loading / error states are required in every section — the page must never crash on a failed request.
- No emojis. No code comments.

## File Map

- Create `src/config/portfolio.ts` — `portfolioConfig` endpoint strings.
- Create `src/api/portfolio/types.ts` — snake_case response contracts.
- Create `src/api/portfolio/index.ts` — `getPortfolioOverview`, `getPortfolioHoldings`, `getPortfolioProfitLoss`.
- Modify `src/api/react-query-keys.ts` — export `portfolioQueryKeys`.
- Create `src/utils/format.ts` — shared `formatCurrency`/`formatPercent` (moved from board).
- Modify `src/views/dashboard/board/utils.ts` — re-export from `@/utils/format` (keeps the 7 existing board imports working).
- Create `src/views/dashboard/portfolio/utils.ts` — risk label, diversification status color, performance %, amount unit, allocation percent, CSV builder/download, `timeAgo`.
- Create `src/views/dashboard/portfolio/components/LoadingState.tsx` — shared skeleton.
- Create `src/views/dashboard/portfolio/components/EmptyState.tsx` — shared no-data placeholder.
- Create `src/views/dashboard/portfolio/components/PortfolioHeader.tsx` — heading, subtitle, Add Funds / Rebalance buttons.
- Create `src/views/dashboard/portfolio/components/PortfolioStats/index.tsx` + `components/StatCard.tsx` — 4 KPI cards.
- Create `src/views/dashboard/portfolio/components/AssetAllocation/index.tsx` + `components/AllocationLegend.tsx` — donut + legend.
- Create `src/views/dashboard/portfolio/components/PerformanceGrowth.tsx` — 7D/1M tabs + empty placeholder.
- Create `src/views/dashboard/portfolio/components/HoldingsTable/index.tsx` + `components/HoldingsRow.tsx` — search, CSV export, table.
- Modify `src/views/dashboard/portfolio/index.tsx` — page composition + react-query.

---

### Task 1: API layer (config, types, fetchers, query keys)

**Files:**
- Create: `src/config/portfolio.ts`
- Create: `src/api/portfolio/types.ts`
- Create: `src/api/portfolio/index.ts`
- Modify: `src/api/react-query-keys.ts`

**Interfaces:**
- Produces:
  - `portfolioConfig.overviewEndpoint / holdingsEndpoint / profitLossEndpoint`
  - types `PortfolioOverviewResponse`, `AssetAllocationItem`, `HoldingResponse`, `PortfolioProfitLossResponse`, `InstrumentProfitLossResult`
  - `getPortfolioOverview(): Promise<PortfolioOverviewResponse>`
  - `getPortfolioHoldings(): Promise<HoldingResponse[]>`
  - `getPortfolioProfitLoss(): Promise<PortfolioProfitLossResponse>`
  - `portfolioQueryKeys.overview / holdings / profitLoss`

Consumed by Tasks 3–9.

- [ ] **Step 1: Create `src/config/portfolio.ts`**

```ts
export const portfolioConfig = {
    overviewEndpoint: '/portfolio/overview',
    holdingsEndpoint: '/portfolio/holdings',
    profitLossEndpoint: '/portfolio/profit-loss',
};
```

- [ ] **Step 2: Create `src/api/portfolio/types.ts`**

```ts
// Backend contract types (snake_case). Mirror src/api/auth/types.ts conventions.

export type AssetAllocationItem = {
    category: string;
    value?: number;
    percentage?: number;
};

export type PortfolioOverviewResponse = {
    portfolio_value: number;
    asset_allocation: AssetAllocationItem[];
    diversification_score: string;
    portfolio_risk_score: number;
};

export type HoldingResponse = {
    instrument_id: number;
    symbol: string;
    name: string;
    category: string;
    current_price: number;
    total_buy: number;
    total_sell: number;
    net_quantity: number;
    instrument_value: number;
    portfolio_risk_label: string;
};

export type InstrumentProfitLossResult = {
    instrument_id: number | null;
    symbol: string | null;
    realized_profit: number;
    unrealized_profit: number;
    total_profit_loss: number;
    remaining_quantity: number;
    remaining_cost_basis: number;
};

export type PortfolioProfitLossResponse = {
    portfolio_realized_profit: number;
    portfolio_unrealized_profit: number;
    portfolio_total_profit_loss: number;
    instruments: InstrumentProfitLossResult[];
};
```

- [ ] **Step 3: Create `src/api/portfolio/index.ts`**

```ts
import { axios } from "@/api";
import { portfolioConfig } from "@/config/portfolio";

import type {
    HoldingResponse,
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
} from "./types";

// API CALLS
export const getPortfolioOverview = async (): Promise<PortfolioOverviewResponse> => {
    try {
        const response = await axios.get<PortfolioOverviewResponse>(
            portfolioConfig.overviewEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio overview:", error);
        throw error;
    }
};

export const getPortfolioHoldings = async (): Promise<HoldingResponse[]> => {
    try {
        const response = await axios.get<HoldingResponse[]>(
            portfolioConfig.holdingsEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio holdings:", error);
        throw error;
    }
};

export const getPortfolioProfitLoss = async (): Promise<PortfolioProfitLossResponse> => {
    try {
        const response = await axios.get<PortfolioProfitLossResponse>(
            portfolioConfig.profitLossEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio profit/loss:", error);
        throw error;
    }
};
```

- [ ] **Step 4: Write `src/api/react-query-keys.ts`** (currently empty — overwrite)

```ts
export const portfolioQueryKeys = {
    overview: ["portfolio", "overview"] as const,
    holdings: ["portfolio", "holdings"] as const,
    profitLoss: ["portfolio", "profit-loss"] as const,
};
```

- [ ] **Step 5: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/config/portfolio.ts src/api/portfolio/types.ts src/api/portfolio/index.ts src/api/react-query-keys.ts
git commit -m "feat: add portfolio API module with overview, holdings, profit-loss"
```

---

### Task 2: Shared currency/percent formatters

**Files:**
- Create: `src/utils/format.ts`
- Modify: `src/views/dashboard/board/utils.ts`

**Interfaces:**
- Produces: `formatCurrency(value: number, fractionDigits?: number): string`, `formatPercent(value: number): string`
- Consumes: nothing. Consumed by Tasks 3–9 (import `@/utils/format`).
- Existing board components keep importing `@/views/dashboard/board/utils` — that module now re-exports, so their imports stay valid.

- [ ] **Step 1: Create `src/utils/format.ts`**

```ts
export const formatCurrency = (value: number, fractionDigits = 2): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: fractionDigits,
    }).format(value);

export const formatPercent = (value: number): string =>
    `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
```

- [ ] **Step 2: Replace `src/views/dashboard/board/utils.ts` with a re-export**

```ts
export { formatCurrency, formatPercent } from "@/utils/format";
```

- [ ] **Step 3: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors (all 7 existing board imports resolve via the re-export).

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/utils/format.ts src/views/dashboard/board/utils.ts
git commit -m "feat: move shared formatters to src/utils/format"
```

---

### Task 3: Portfolio page helpers

**Files:**
- Create: `src/views/dashboard/portfolio/utils.ts`

**Interfaces:**
- Consumes: `HoldingResponse`, `InstrumentProfitLossResult`, `AssetAllocationItem` (from `@/api/portfolio/types`).
- Produces (consumed by Tasks 4–9):
  - `riskLabelFromScore(score: number): "Low" | "Moderate" | "High"`
  - `diversificationStatusColor(label: string): "success" | "warning" | "error"`
  - `performancePercent(profitLoss: number, costBasis: number): number`
  - `performanceByInstrument(instruments: InstrumentProfitLossResult[]): Map<number, number>`
  - `amountWithUnit(holding: HoldingResponse): string`
  - `allocationItemsWithPercent(items: AssetAllocationItem[]): Array<AssetAllocationItem & { value: number; percentage: number }>`
  - type `HoldingsRow = HoldingResponse & { amount: string; performance: number }`
  - `buildHoldingsCsv(rows: HoldingsRow[]): string`
  - `downloadCsv(filename: string, content: string): void`
  - `timeAgo(timestamp: number): string`

- [ ] **Step 1: Write `src/views/dashboard/portfolio/utils.ts`**

```ts
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
    COMMODITY: "oz",
    INDEX: "Units",
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
```

- [ ] **Step 2: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/views/dashboard/portfolio/utils.ts
git commit -m "feat: add portfolio derived presentation helpers"
```

---

### Task 4: LoadingState, EmptyState, PortfolioHeader

**Files:**
- Create: `src/views/dashboard/portfolio/components/LoadingState.tsx`
- Create: `src/views/dashboard/portfolio/components/EmptyState.tsx`
- Create: `src/views/dashboard/portfolio/components/PortfolioHeader.tsx`

**Interfaces:**
- Produces:
  - `LoadingState({ lines?: number })`
  - `EmptyState({ icon?: ElementType; title: string; description?: string; action?: ReactNode })`
  - `PortfolioHeader` (no props)
- Consumed by Tasks 5–9.

- [ ] **Step 1: Create `src/views/dashboard/portfolio/components/LoadingState.tsx`**

```tsx
import { Skeleton, Stack } from "@mui/material";

type LoadingStateProps = {
    height?: number;
    lines?: number;
};

export default function LoadingState({ height = 48, lines = 3 }: LoadingStateProps) {
    return (
        <Stack spacing={1}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={height} />
            ))}
        </Stack>
    );
}
```

- [ ] **Step 2: Create `src/views/dashboard/portfolio/components/EmptyState.tsx`**

```tsx
import type { ElementType, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

type EmptyStateProps = {
    icon?: ElementType;
    title: string;
    description?: string;
    action?: ReactNode;
};

export default function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ py: 6, textAlign: "center" }}
        >
            {Icon && <Icon sx={{ fontSize: 40, color: "text.disabled" }} />}
            <Typography variant="body2">{title}</Typography>
            {description && (
                <Typography variant="caption" color="text.secondary">
                    {description}
                </Typography>
            )}
            {action}
        </Stack>
    );
}
```

- [ ] **Step 3: Create `src/views/dashboard/portfolio/components/PortfolioHeader.tsx`**

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import { PATHS } from "@/routes/paths";

export default function PortfolioHeader() {
    const router = useRouter();

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
        >
            <Box>
                <Typography variant="h4">Portfolio Analysis</Typography>
                <Typography variant="body2" color="text.secondary">
                    Analyze your asset distribution, risk profile, and real-time
                    performance across all linked trading strategies.
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    onClick={() => router.push(PATHS.dashboard.deposit)}
                >
                    Add Funds
                </Button>
                <Tooltip title="Coming soon">
                    <span>
                        <Button variant="outlined" disabled>
                            Rebalance Portfolio
                        </Button>
                    </span>
                </Tooltip>
            </Stack>
        </Stack>
    );
}
```

- [ ] **Step 4: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/views/dashboard/portfolio/components/LoadingState.tsx src/views/dashboard/portfolio/components/EmptyState.tsx src/views/dashboard/portfolio/components/PortfolioHeader.tsx
git commit -m "feat: add portfolio header and shared loading/empty states"
```

---

### Task 5: PortfolioStats — KPI cards

**Files:**
- Create: `src/views/dashboard/portfolio/components/PortfolioStats/index.tsx`
- Create: `src/views/dashboard/portfolio/components/PortfolioStats/components/StatCard.tsx`

**Interfaces:**
- Consumes: `PortfolioOverviewResponse`, `PortfolioProfitLossResponse`; helpers `riskLabelFromScore`, `diversificationStatusColor` from Task 3; `formatCurrency` from Task 2.
- Produces: `PortfolioStats` with props `{ overview?: PortfolioOverviewResponse; profitLoss?: PortfolioProfitLossResponse; loading?: boolean; error?: boolean; onRetry?: () => void }`; type `KpiStat` exported from `StatCard.tsx`.
- Consumed by Task 9.

- [ ] **Step 1: Create `src/views/dashboard/portfolio/components/PortfolioStats/components/StatCard.tsx`**

```tsx
import type { ElementType } from "react";
import {
    Card,
    Chip,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { SxProps, Theme } from "@mui/material/styles";

import { formatPercent } from "@/utils/format";

export type KpiStat = {
    id: string;
    label: string;
    value: string;
    icon: ElementType;
    trend?: "up" | "down";
    changePct?: number;
    status?: "success" | "warning" | "error" | "neutral";
    statusLabel?: string;
    caption?: string;
};

const STATUS_COLOR: Record<NonNullable<KpiStat["status"]>, string> = {
    success: "success.main",
    warning: "warning.main",
    error: "error.main",
    neutral: "info.main",
};

const MEDIUM_SX: SxProps<Theme> = { fontSize: "1.1rem", whiteSpace: "nowrap" };

type StatCardProps = {
    stat: KpiStat;
};

export default function StatCard({ stat }: StatCardProps) {
    const isUp = stat.trend === "up";
    const statusColor = stat.status ? STATUS_COLOR[stat.status] : undefined;

    return (
        <Card sx={{ p: 2, height: "100%" }}>
            <Stack spacing={1}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <stat.icon sx={{ color: "primary.main", fontSize: 22 }} />
                    {stat.status && stat.statusLabel ? (
                        <Chip
                            size="small"
                            label={stat.statusLabel}
                            sx={{
                                color: statusColor,
                                bgcolor: "transparent",
                                pl: 0,
                            }}
                        />
                    ) : stat.trend && stat.changePct !== undefined ? (
                        <Chip
                            size="small"
                            icon={
                                isUp ? (
                                    <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                                ) : (
                                    <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )
                            }
                            label={formatPercent(stat.changePct)}
                            sx={{
                                color: isUp ? "success.main" : "error.main",
                                bgcolor: "transparent",
                                pl: 0,
                                "& .MuiChip-icon": {
                                    color: isUp ? "success.main" : "error.main",
                                },
                            }}
                        />
                    ) : null}
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    {stat.label}
                </Typography>

                <Tooltip title={stat.statusLabel ?? stat.label}>
                    <Typography variant="h6" sx={MEDIUM_SX}>
                        {stat.value}
                    </Typography>
                </Tooltip>

                {stat.caption && (
                    <Typography variant="caption" color="text.secondary">
                        {stat.caption}
                    </Typography>
                )}
            </Stack>
        </Card>
    );
}
```

Note: `MEDIUM_SX` is a workaround so `h6` text (currency values can be long) renders on one line without overflow.

- [ ] **Step 2: Create `src/views/dashboard/portfolio/components/PortfolioStats/index.tsx`**

```tsx
"use client";

import { useMemo } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SpeedIcon from "@mui/icons-material/Speed";

import { formatCurrency } from "@/utils/format";
import { diversificationStatusColor, riskLabelFromScore } from "../../utils";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import StatCard from "./components/StatCard";
import type { KpiStat } from "./components/StatCard";

import type {
    PortfolioOverviewResponse,
    PortfolioProfitLossResponse,
} from "@/api/portfolio/types";

type PortfolioStatsProps = {
    overview?: PortfolioOverviewResponse;
    profitLoss?: PortfolioProfitLossResponse;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PortfolioStats({
    overview,
    profitLoss,
    loading,
    error,
    onRetry,
}: PortfolioStatsProps) {
    const stats: KpiStat[] = useMemo(() => {
        const portfolioValue = overview?.portfolio_value ?? 0;
        const realized = profitLoss?.portfolio_realized_profit ?? 0;
        const unrealized = profitLoss?.portfolio_unrealized_profit ?? 0;
        const totalPnl = profitLoss?.portfolio_total_profit_loss ?? 0;
        const totalPnlIsUp = totalPnl >= 0;
        const changePct =
            portfolioValue > 0 ? (totalPnl / portfolioValue) * 100 : 0;
        const riskScore = overview?.portfolio_risk_score ?? 0;
        const diversificationLabel = overview?.diversification_score ?? "";

        return [
            {
                id: "value",
                label: "Total Portfolio Value",
                value: formatCurrency(portfolioValue, 0),
                icon: AccountBalanceWalletIcon,
                trend: totalPnlIsUp ? "up" : "down",
                changePct,
                caption: "Across all linked strategies",
            },
            {
                id: "pl",
                label: "Profit / Loss",
                value: formatCurrency(totalPnl, 0),
                icon: TrendingUpIcon,
                trend: totalPnlIsUp ? "up" : "down",
                caption: `Realized ${formatCurrency(realized)} · Unrealized ${formatCurrency(unrealized)}`,
            },
            {
                id: "diversification",
                label: "Diversification Score",
                value: diversificationLabel
                    ? diversificationLabel.charAt(0).toUpperCase() +
                      diversificationLabel.slice(1).toLowerCase()
                    : "—",
                icon: DonutSmallIcon,
                status: diversificationLabel
                    ? diversificationStatusColor(diversificationLabel)
                    : "neutral",
                statusLabel:
                    diversificationLabel.charAt(0).toUpperCase() +
                    diversificationLabel.slice(1).toLowerCase(),
                caption: "Weight across categories",
            },
            {
                id: "risk",
                label: "Risk Appetite",
                value: riskLabelFromScore(riskScore),
                icon: SpeedIcon,
                status: "neutral",
                statusLabel: riskLabelFromScore(riskScore),
                caption: `Risk score ${riskScore.toFixed(2)}`,
            },
        ];
    }, [overview, profitLoss]);

    if (loading) {
        return (
            <Grid container spacing={3}>
                {[0, 1, 2, 3].map((index) => (
                    <Grid key={index} size={{ xs: 6, md: 3 }}>
                        <LoadingState height={88} lines={2} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <EmptyState
                        title="Portfolio statistics unavailable"
                        description="We could not load your portfolio numbers."
                        action={
                            <Button size="small" variant="outlined" onClick={onRetry}>
                                Retry
                            </Button>
                        }
                    />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {stats.map((stat) => (
                <Grid key={stat.id} size={{ xs: 6, md: 3 }}>
                    <Tooltip title={stat.statusLabel ?? ""} placement="top">
                        <span style={{ display: "block", height: "100%" }}>
                            <StatCard stat={stat} />
                        </span>
                    </Tooltip>
                </Grid>
            ))}
        </Grid>
    );
}
```

Note: `changePct` for the total-value card uses `(realized + unrealized) / value`, so when the portfolio is empty the value card shows no misleading trend. When `portfolioValue === 0`, `changePct = 0` and `formatPercent` renders "+0.0%".

- [ ] **Step 3: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/views/dashboard/portfolio/components/PortfolioStats
git commit -m "feat: add portfolio stats KPI cards"
```

---

### Task 6: AssetAllocation — donut + legend

**Files:**
- Create: `src/views/dashboard/portfolio/components/AssetAllocation/index.tsx`
- Create: `src/views/dashboard/portfolio/components/AssetAllocation/components/AllocationLegend.tsx`

**Interfaces:**
- Consumes: `AssetAllocationItem`; `allocationItemsWithPercent` from Task 3; `formatCurrency` from Task 2.
- Produces: `AssetAllocation` with props `{ items?: AssetAllocationItem[]; totalValue?: number; loading?: boolean; error?: boolean; onRetry?: () => void }`.
- Consumed by Task 9.

- [ ] **Step 1: Create `src/views/dashboard/portfolio/components/AssetAllocation/components/AllocationLegend.tsx`**

```tsx
import { Box, Stack, Typography } from "@mui/material";

import { formatPercent } from "@/utils/format";

type LegendItem = {
    category: string;
    color: string;
    percentage: number;
    value: number;
};

type AllocationLegendProps = {
    items: LegendItem[];
};

export default function AllocationLegend({ items }: AllocationLegendProps) {
    return (
        <Stack
            spacing={1.25}
            sx={{ width: "100%", maxWidth: 220, mx: "auto", my: "auto" }}
        >
            {items.map((item) => (
                <Stack key={item.category} direction="row" spacing={1}>
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: item.color,
                            flexShrink: 0,
                            mt: 0.5,
                        }}
                    />
                    <Stack flex={1}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="caption" color="text.secondary">
                                {item.category}
                            </Typography>
                            <Typography variant="caption">
                                {formatPercent(item.percentage)}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", opacity: 0.7 }}
                        >
                            {item.value.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                            })}
                        </Typography>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
```

- [ ] **Step 2: Create `src/views/dashboard/portfolio/components/AssetAllocation/index.tsx`**

```tsx
"use client";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import DashboardCard from "@/components/DashboardCard";
import { formatCurrency } from "@/utils/format";
import { allocationItemsWithPercent } from "../../utils";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import AllocationLegend from "./components/AllocationLegend";

import type { AssetAllocationItem } from "@/api/portfolio/types";

type AssetAllocationProps = {
    items?: AssetAllocationItem[];
    totalValue?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function AssetAllocation({
    items = [],
    totalValue = 0,
    loading,
    error,
    onRetry,
}: AssetAllocationProps) {
    const theme = useTheme();

    const categoryColor = (category: string): string => {
        const upper = category.toUpperCase();
        if (upper === "FOREX") return theme.palette.primary.main;
        if (upper === "CRYPTO" || upper === "CRYPTOCURRENCY") return theme.palette.secondary.main;
        if (upper === "COMMODITY" || upper === "COMMODITIES") return theme.palette.success.main;
        if (upper === "INDEX" || upper === "INDICES") return theme.palette.warning.main;
        return theme.text.primary;
    };

    const allocation = allocationItemsWithPercent(items);
    const hasData = allocation.length > 0;

    return (
        <DashboardCard
            title="Asset Allocation"
            icon={DonutSmallIcon}
            action={<Chip size="small" label="Live Data" color="primary" variant="outlined" />}
        >
            {loading ? (
                <LoadingState height={28} lines={6} />
            ) : error ? (
                <EmptyState
                    title="Allocation unavailable"
                    description="We could not load your asset allocation."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : !hasData ? (
                <EmptyState
                    icon={DonutSmallIcon}
                    title="No allocation yet"
                    description="Your portfolio allocation will appear here once you hold instruments."
                />
            ) : (
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: 160, sm: 180, md: 200 },
                            height: { xs: 160, sm: 180, md: 200 },
                            flexShrink: 0,
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={allocation}
                                    dataKey="percentage"
                                    nameKey="category"
                                    innerRadius="62%"
                                    outerRadius="100%"
                                    paddingAngle={2}
                                    stroke="none"
                                    isAnimationActive={false}
                                >
                                    {allocation.map((item) => (
                                        <Cell
                                            key={item.category}
                                            fill={categoryColor(item.category)}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                            }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                TOTAL
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {formatCurrency(totalValue, 0)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                100%
                            </Typography>
                        </Stack>
                    </Box>

                    <AllocationLegend
                        items={allocation.map((item) => ({
                            category: item.category,
                            color: categoryColor(item.category),
                            percentage: item.percentage,
                            value: item.value,
                        }))}
                    />
                </Stack>
            )}
        </DashboardCard>
    );
}
```

- [ ] **Step 3: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/views/dashboard/portfolio/components/AssetAllocation
git commit -m "feat: add asset allocation donut chart"
```

---

### Task 7: PerformanceGrowth — placeholder card

**Files:**
- Create: `src/views/dashboard/portfolio/components/PerformanceGrowth.tsx`

**Interfaces:**
- Produces: `PerformanceGrowth` with props `{ loading?: boolean; error?: boolean; onRetry?: () => void }`. Renders 7D/1M tabs; content is an empty-state placeholder (no time-series endpoint exists yet).
- Consumed by Task 9.

- [ ] **Step 1: Create `src/views/dashboard/portfolio/components/PerformanceGrowth.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import DashboardCard from "@/components/DashboardCard";

import EmptyState from "./EmptyState";

type Timeframe = "7D" | "1M";

type PerformanceGrowthProps = {
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PerformanceGrowth(_props: PerformanceGrowthProps) {
    const [timeframe, setTimeframe] = useState<Timeframe>("7D");

    return (
        <DashboardCard
            title="Performance Growth"
            icon={ShowChartIcon}
            action={
                <Tabs
                    value={timeframe}
                    onChange={(_event, nextValue) => setTimeframe(nextValue as Timeframe)}
                    sx={{
                        minHeight: 32,
                        "& .MuiTab-root": {
                            minHeight: 32,
                            px: 1.5,
                            py: 0.5,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            color: "text.secondary",
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "primary.main",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "primary.main",
                            height: 2,
                        },
                    }}
                >
                    <Tab value="7D" label="7D" />
                    <Tab value="1M" label="1M" />
                </Tabs>
            }
        >
            <EmptyState
                icon={ShowChartIcon}
                title="Historical performance coming soon"
                description="A net-value trend for the selected period will appear here once a time-series endpoint is available."
            />
        </DashboardCard>
    );
}
```

Note: `_props` silences the unused-parameter lint rule while keeping the same props interface as the other sections.

- [ ] **Step 2: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/views/dashboard/portfolio/components/PerformanceGrowth.tsx
git commit -m "feat: add performance growth placeholder card"
```

---

### Task 8: HoldingsTable — search, CSV export, table

**Files:**
- Create: `src/views/dashboard/portfolio/components/HoldingsTable/index.tsx`
- Create: `src/views/dashboard/portfolio/components/HoldingsTable/components/HoldingsRow.tsx`

**Interfaces:**
- Consumes: `HoldingResponse`, `InstrumentProfitLossResult`; helpers from Task 3: `HoldingsRow`, `amountWithUnit`, `performancePercent`, `performanceByInstrument`, `buildHoldingsCsv`, `downloadCsv`, `timeAgo`; `formatCurrency` from Task 2.
- Produces: `HoldingsTable` with props `{ holdings?: HoldingResponse[]; performance?: Map<number, number>; lastUpdated?: number; loading?: boolean; error?: boolean; onRetry?: () => void }`.
- Consumed by Task 9.

- [ ] **Step 1: Create `src/views/dashboard/portfolio/components/HoldingsTable/components/HoldingsRow.tsx`**

```tsx
import {
    Box,
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { formatCurrency } from "@/utils/format";

import type { HoldingsRow as HoldingsRowData } from "@/views/dashboard/portfolio/utils";

const CATEGORY_COLOR: Record<string, string> = {
    FOREX: "primary.main",
    CRYPTO: "secondary.main",
    CRYPTOCURRENCY: "secondary.main",
    COMMODITY: "success.main",
    COMMODITIES: "success.main",
    INDEX: "warning.main",
    INDICES: "warning.main",
};

export const categoryColor = (category: string): string =>
    CATEGORY_COLOR[category.toUpperCase()] ?? "info.main";

type HoldingsRowProps = {
    row: HoldingsRowData;
};

export default function HoldingsRow({ row }: HoldingsRowProps) {
    const isUp = row.performance >= 0;
    const color = categoryColor(row.category);

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
                    <Box>
                        <Typography variant="body2">{row.symbol}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {row.name}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={row.category}
                    sx={{
                        color,
                        border: "1px solid",
                        borderColor: color,
                        bgcolor: "transparent",
                    }}
                />
            </TableCell>

            <TableCell>
                <Typography variant="body2">{row.amount}</Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="body2">
                    {formatCurrency(row.current_price)}
                </Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                <Typography variant="body2">
                    {formatCurrency(row.instrument_value)}
                </Typography>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={`${isUp ? "+" : ""}${row.performance.toFixed(2)}%`}
                    sx={{
                        color: isUp ? "success.main" : "error.main",
                        border: "1px solid",
                        borderColor: isUp ? "success.main" : "error.main",
                        bgcolor: "transparent",
                    }}
                />
            </TableCell>

            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                <Tooltip title="View">
                    <IconButton size="small">
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Open chart">
                    <IconButton size="small">
                        <OpenInNewIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
```

- [ ] **Step 2: Create `src/views/dashboard/portfolio/components/HoldingsTable/index.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import {
    Button,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import TableChartIcon from "@mui/icons-material/TableChart";

import DashboardCard from "@/components/DashboardCard";
import {
    amountWithUnit,
    buildHoldingsCsv,
    downloadCsv,
    timeAgo,
} from "../../utils";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import HoldingsRow from "./components/HoldingsRow";

import type { HoldingsRow as HoldingsRowData } from "../../utils";
import type { HoldingResponse } from "@/api/portfolio/types";

const HEAD_CELLS = [
    "Asset",
    "Category",
    "Amount",
    "Current Price",
    "Total Value",
    "Performance",
    "Actions",
];

type HoldingsTableProps = {
    holdings?: HoldingResponse[];
    performance?: Map<number, number>;
    lastUpdated?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function HoldingsTable({
    holdings = [],
    performance = new Map<number, number>(),
    lastUpdated,
    loading,
    error,
    onRetry,
}: HoldingsTableProps) {
    const [search, setSearch] = useState("");

    const rows: HoldingsRowData[] = useMemo(
        () =>
            holdings.map((holding) => ({
                ...holding,
                amount: amountWithUnit(holding),
                performance: performance.get(holding.instrument_id) ?? 0,
            })),
        [holdings, performance]
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return rows;
        return rows.filter((row) =>
            `${row.symbol} ${row.name} ${row.category}`.toLowerCase().includes(query)
        );
    }, [rows, search]);

    const handleExport = () =>
        downloadCsv("holdings.csv", buildHoldingsCsv(filtered));

    return (
        <DashboardCard
            title="Asset Performance Breakdown"
            icon={TableChartIcon}
            action={
                lastUpdated ? (
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {timeAgo(lastUpdated)}
                    </Typography>
                ) : undefined
            }
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
                mb={2}
            >
                <TextField
                    size="small"
                    placeholder="Search holdings..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    sx={{ maxWidth: 320, width: "100%" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleExport}
                    disabled={filtered.length === 0}
                >
                    Export CSV
                </Button>
            </Stack>

            {loading ? (
                <LoadingState height={40} lines={6} />
            ) : error ? (
                <EmptyState
                    title="Holdings unavailable"
                    description="We could not load your holdings."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon={TableChartIcon}
                    title={rows.length === 0 ? "No holdings yet" : "No matching holdings"}
                    description={
                        rows.length === 0
                            ? "Buy an instrument to start building your portfolio."
                            : "Try a different search term."
                    }
                />
            ) : (
                <TableContainer sx={{ mx: { xs: -2, md: -3 }, width: "auto" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {HEAD_CELLS.map((cell, index) => (
                                    <TableCell
                                        key={cell}
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "0.75rem",
                                            textTransform: "uppercase",
                                            display:
                                                index === 3
                                                    ? { xs: "none", sm: "table-cell" }
                                                    : index === 4
                                                      ? { xs: "none", md: "table-cell" }
                                                      : undefined,
                                        }}
                                    >
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtered.map((row) => (
                                <HoldingsRow key={row.instrument_id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </DashboardCard>
    );
}
```

Note: `dashboard` uses MUI v7 `Table`. The header-cell `display` mirrors `RecentTrades`' responsive hiding (Current Price hides below `sm`, Total Value below `md`), and `HoldingsRow` uses the same breakpoints.

- [ ] **Step 3: Verify**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/views/dashboard/portfolio/components/HoldingsTable
git commit -m "feat: add holdings table with search and CSV export"
```

---

### Task 9: Portfolio page composition

**Files:**
- Modify: `src/views/dashboard/portfolio/index.tsx` (replace the placeholder entirely)

**Interfaces:**
- Consumes: fetchers (Task 1), `portfolioQueryKeys`, section components (Tasks 4–8), `performanceByInstrument` (Task 3).
- Produces: the default-exported `Portfolio` page component consumed by `src/app/(dashboard)/dashboard/portfolio/page.tsx` (no change needed there).

- [ ] **Step 1: Rewrite `src/views/dashboard/portfolio/index.tsx`**

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { Grid, Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import {
    getPortfolioHoldings,
    getPortfolioOverview,
    getPortfolioProfitLoss,
} from "@/api/portfolio";
import { portfolioQueryKeys } from "@/api/react-query-keys";

import { performanceByInstrument } from "./utils";

import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioStats from "./components/PortfolioStats";
import AssetAllocation from "./components/AssetAllocation";
import PerformanceGrowth from "./components/PerformanceGrowth";
import HoldingsTable from "./components/HoldingsTable";

export default function Portfolio() {
    const overviewQuery = useQuery({
        queryKey: portfolioQueryKeys.overview,
        queryFn: getPortfolioOverview,
    });
    const holdingsQuery = useQuery({
        queryKey: portfolioQueryKeys.holdings,
        queryFn: getPortfolioHoldings,
    });
    const profitLossQuery = useQuery({
        queryKey: portfolioQueryKeys.profitLoss,
        queryFn: getPortfolioProfitLoss,
    });

    const loading =
        overviewQuery.isLoading || holdingsQuery.isLoading || profitLossQuery.isLoading;

    const error =
        overviewQuery.isError || holdingsQuery.isError || profitLossQuery.isError;

    const retry = () => {
        overviewQuery.refetch();
        holdingsQuery.refetch();
        profitLossQuery.refetch();
    };

    const sectionProps = { loading, error, onRetry: retry };

    const lastUpdated = Math.max(
        overviewQuery.dataUpdatedAt,
        holdingsQuery.dataUpdatedAt,
        profitLossQuery.dataUpdatedAt
    );

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <PortfolioHeader />

                <PortfolioStats
                    overview={overviewQuery.data}
                    profitLoss={profitLossQuery.data}
                    {...sectionProps}
                />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AssetAllocation
                            items={overviewQuery.data?.asset_allocation}
                            totalValue={overviewQuery.data?.portfolio_value}
                            {...sectionProps}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <PerformanceGrowth {...sectionProps} />
                    </Grid>
                </Grid>

                <HoldingsTable
                    holdings={holdingsQuery.data}
                    performance={performanceByInstrument(
                        profitLossQuery.data?.instruments ?? []
                    )}
                    lastUpdated={lastUpdated}
                    {...sectionProps}
                />
            </Stack>
        </ContentWrapper>
    );
}
```

- [ ] **Step 2: Verify types and lint**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 3: Full build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/views/dashboard/portfolio/index.tsx
git commit -m "feat: compose portfolio analysis page"
```

---

### Task 10: Final verification

**Files:** none (read-only check).

- [ ] **Step 1: Type-check and lint the whole project**

Run: `pnpm tsc --noEmit`
Expected: no type errors.

Run: `pnpm lint`
Expected: no lint errors.

- [ ] **Step 2: Confirm the three backend endpoints respond** (requires the local backend on `http://localhost:8001`)

Run: `curl -s http://127.0.0.1:8001/portfolio/overview | head -c 400`
Expected: JSON overview payload (or a JSON error body — see note).

- [ ] **Step 3: Manual smoke test** (with backend running and a logged-in session)

- `/dashboard/portfolio` renders: heading, 4 KPI cards, allocation donut, performance-growth placeholder, holdings table.
- Individual section errors (stop the backend, reload) show retry empty states; the page does not crash.
- Empty portfolio (test user with no holdings) shows "No holdings yet" and "No allocation yet".
- Search narrows the holdings table; Export CSV downloads the filtered rows.

Note: If the backend isn't reachable during this task, rely on tsc + lint + build + the code-path review against the spec; the runtime smoke test is required once the backend is available.

- [ ] **Step 4: No commit needed** (verification pass only).

---

## Self-Review Notes

- **Spec coverage:** overview KPIs → Task 5; allocation donut → Task 6; growth placeholder → Task 7; holdings + search + CSV → Task 8; header + actions → Task 4; empty/loading/error states → every section; API module + react-query caching → Tasks 1 & 9; shared formatters move → Task 2; CSV/last-updated/units/risk/diversification/performance helpers → Task 3.
- **Placeholders:** none — every step contains complete file contents.
- **Type consistency:** `HoldingsRow`, `performanceByInstrument`, `allocationItemsWithPercent`, `KpiStat`, and the section prop shapes are defined once and reused consistently across tasks.