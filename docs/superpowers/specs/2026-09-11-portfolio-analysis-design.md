# Portfolio Analysis Page — Design

Date: 2026-09-11
Status: Approved (design validated in chat before writing this spec)

## Goal

Build out the placeholder Portfolio page at `/dashboard/portfolio` into a real
analytics page that derives portfolio concepts (value, allocation, diversification,
risk, P/L, holdings) from the backend portfolio endpoints. The page reads from
three backend routes; the frontend performs the small derived-metric joins and
label mappings. The Overview dashboard card (`PortfolioAnalytics`) stays on mock
data and is untouched.

## Backend contracts (source of truth)

All endpoints return snake_case JSON. Errors are unwrapped by the shared axios
interceptor (callers receive `{ statusCode, result }`).

### `GET /portfolio/overview`

```
PortfolioOverviewResponse:
    portfolio_value: Decimal
    asset_allocation: List[AssetAllocation]
    diversification_score: str      # label string: "poor" | "good" | ... (e.g. "moderate")
    portfolio_risk_score: Decimal
```

`asset_allocation` items are **per-category** (Forex / Crypto / Commodities /
Indices). Exact item fields are not yet known (backend class not fully shared);
assume `{ category: string, value?: number, percentage?: number }`. Rendering
uses `percentage` when the backend provides it, otherwise derives it
client-side as `value / sum(values) × 100`; the donut requires `category` plus
at least one of `value`/`percentage`.

### `GET /portfolio/holdings`

List of:
```
HoldingResponse:
    instrument_id: int
    symbol: str
    name: str
    category: str
    current_price: Decimal
    total_buy: Decimal
    total_sell: Decimal
    net_quantity: Decimal
    instrument_value: Decimal
    portfolio_risk_label: str
```

### `GET /portfolio/profit-loss`

```
PortfolioProfitLossResponse:
    portfolio_realized_profit: Decimal
    portfolio_unrealized_profit: Decimal
    portfolio_total_profit_loss: Decimal
    instruments: List[InstrumentProfitLossResult]

InstrumentProfitLossResult:
    instrument_id: int | None
    symbol: str | None
    realized_profit: Decimal
    unrealized_profit: Decimal
    total_profit_loss: Decimal
    remaining_quantity: Decimal
    remaining_cost_basis: Decimal
```

## Data fetching

- react-query (`QueryProvider` already wraps the app). Three parallel `useQuery`
  calls: overview, holdings, profit-loss. Client-side caching with stale-while-
  revalidate semantics.
- Query keys live in `src/api/react-query-keys.ts` (currently empty).
- If any single request fails, only that section renders a retry/error empty
  state; the page does not crash.

## API layer

New module under `src/api/portfolio/`, mirroring `src/api/auth/`:

- `src/config/portfolio.ts` — `portfolioConfig` with the three endpoint strings.
- `src/api/portfolio/types.ts` — snake_case TypeScript types for the three
  contracts above.
- `src/api/portfolio/index.ts` — three fetchers
  (`getPortfolioOverview`, `getPortfolioHoldings`, `getPortfolioProfitLoss`)
  using the shared axios instance; each returns `response.data`; errors bubble
  (already unwrapped by interceptor).

## Derived metrics

Computed client-side from the three responses:

- **Performance % per holding** = `total_profit_loss / remaining_cost_basis × 100`
  (profit-loss instrument matched to holding by `instrument_id`).
- **Portfolio change indicator** (Total Portfolio Value KPI) =
  `(realized + unrealized) / portfolio_value × 100`; sign decides up/down.
- **Risk Appetite label** from `portfolio_risk_score`:
  1.0–2.0 Low · 2.0–3.5 Moderate · 3.5–5.0 High.
- **Diversification Score** = backend label string (`"poor" | "moderate" | "good"`)
  shown as a status chip: good→success, moderate→warning, poor→error. No numeric
  is available; the design mock's `84/100` is intentionally omitted.
- **Amount unit per holding** by category: Forex→Lots, Crypto→symbol, Commodity→oz,
  Indices→Units.

## Page structure (`src/views/dashboard/portfolio/`)

```
index.tsx                       # 'use client'; three useQuery calls; section layout
utils.ts                        # risk label, diversification status, performance %, unit map, CSV builder
components/
    PortfolioHeader.tsx         # heading + subtitle + Add Funds / Rebalance actions
    PortfolioStats/             # 4 KPI cards
        index.tsx
        components/StatCard.tsx
    AssetAllocation/            # recharts donut + legend
        index.tsx
        components/AllocationLegend.tsx
    PerformanceGrowth.tsx       # 7D/1M tabs; empty placeholder (no series endpoint)
    HoldingsTable/              # search/filter + CSV export + table
        index.tsx
        components/HoldingsRow.tsx
    EmptyState.tsx              # shared no-data placeholder
```

### Sections

1. **Header** — title "Portfolio Analysis", subtitle, two buttons:
   - Add Funds → `router.push(PATHS.dashboard.deposit)`.
   - Rebalance Portfolio → disabled, tooltip "Coming soon" (no backend route).
2. **KPI row** — four stat cards:
   - Total Portfolio Value (from `portfolio_value`; change indicator derived).
   - Profit/Loss (total = `portfolio_total_profit_loss`; realized/unrealized as
     sub-caption; colored by sign).
   - Diversification Score (label chip + status color).
   - Risk Appetite (label + numeric score; no up/down indicator).
3. **Analytics row** — two side-by-side cards:
   - Asset Allocation: recharts `Pie`/`Cell` donut from `asset_allocation`
     (category colors from theme), `TOTAL` + `100%` centered, legend with
     value + percent on the right.
   - Performance Growth: MUI tabs `7D`/`1M` (7D default); content is an empty
     placeholder ("Historical performance data coming soon") until a time-series
     endpoint exists.
4. **Holdings** — section header "Asset Performance Breakdown" + "Last updated:
   X mins ago" (relative to last successful fetch). Holdings table:
   `ASSET | CATEGORY | AMOUNT | CURRENT PRICE | TOTAL VALUE | PERFORMANCE |
   ACTIONS`. Rows render asset icon, category chip, amount with unit,
   `formatCurrency` price/value, performance chip (+/- colored), cosmetic action
   icons (tooltips only, no handler). Above the table: search/filter input
   (filters row data by symbol/name/category) and Export CSV button (builds and
   downloads CSV of the currently filtered rows client-side via Blob).

## Empty / loading / error states

- Loading: compact skeleton per section.
- Error: section-level empty state with retry.
- No data (e.g. no holdings): friendly `EmptyState` ("No holdings yet") in the
  affected card; other cards degrade to "—" where a number is expected.

## Styling / reuse

- `DashboardCard`, MUI theme tokens, `useMediaQuery` hook for responsiveness.
- recharts v3 (installed) for donut + any charting.
- `formatCurrency` / `formatPercent` moved from `src/views/dashboard/board/utils.ts`
  to a new shared `src/utils/format.ts`; the 7 existing board imports re-pointed.

## Verification

No test framework exists. Verify with:
- `pnpm tsc --noEmit`
- `pnpm lint`
- `pnpm build`
- Manual check against the backend at `http://localhost:8001` (three portfolio
  endpoints respond, page renders all sections, empty state verifiable by
  deleting holdings for the test user).