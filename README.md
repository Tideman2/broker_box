# Test Broker

A modern, client-side trading/broker platform frontend. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **MUI v7**. Pure client-side — no API route handlers; all data flows through a centralized Axios layer to an external backend.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | App Router, SSR/ISR-ready framework |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Typed JavaScript |
| MUI (Material UI) | 7.3.8 | Component library (`@mui/material`, `@mui/icons-material`, `@mui/material-nextjs`) |
| Emotion | 11.14 | Styling engine (`@emotion/react`, `@emotion/styled`) |
| TanStack React Query | 5.90 | Server-state management, caching, mutations |
| Axios | 1.20 | HTTP client with auth/token interceptors |
| Zod | 4.3 | Schema validation (register wizard, forms) |
| Recharts | 3.10 | Data visualization (charts, donuts) |
| jwt-decode | 4.0 | JWT payload decoding for session handling |

Package manager: **pnpm** · Linting: **eslint-config-next** · No test framework configured.

## What's Implemented

### Landing & Marketing
- **Landing page** with hero CTA, trading skills section, "how to begin" steps, trading plan cards, and final CTA sections.
- **TradingView ticker tape widget** rendered as a custom `<tv-ticker-tape>` element.

### Authentication
- **Login** with JWT token storage and token-expiry detection.
- **5-step registration wizard** (`country → account → personal → address → finish`) driven by a `useReducer` context, each step validated with inline **Zod** schemas.
- JWT **session management** via `AuthProvider` (`/auth/user` + `jwtDecode`), with automatic unauthenticated redirect to `/auth/login`.
- Full **password reset** route flow (`reset → verify → complete → success`).

### Dashboard
- **Dashboard Board**: portfolio command, KPI stats cards, portfolio analytics, active strategy, market sentiment, recent trades, and financial flow panels.
- **Portfolio**: overview KPIs, holdings table with **search + CSV export**, asset allocation **donut chart**, and performance growth card.
- **Deposit**: crypto and bank payment methods, asset selector, payment details, real-time deposit summary, guidelines, recent deposits with infinite scroll, and success/detail modals.
- **Withdraw**: balance banner, wallet/destination selector, network fee breakdown, withdrawal request flow, progress tracking, recent withdrawals, and full history with detail modals.

### Infrastructure
- **Dark/light theme** with MUI `createTheme` and live toggle.
- **Tagged, isolated route definitions** via a central `PATHS` constant.
- **React Query** integration for all data fetching with cache key utilities.
- **Responsive design** via custom media-query hooks with named breakpoints.

## Placeholder Pages

The following routes exist but are currently stubs (simple headers):
- Dashboard **Markets** (`/dashboard/markets`)
- Dashboard **Settings** (`/dashboard/settings`)

## Project Structure

```
src/
├── app/                    # App Router pages (thin wrappers)
│   ├── (landing)/          # Landing page + layout
│   ├── (auth)/             # Login/register + layout
│   └── (dashboard)/        # Dashboard pages + layout
├── api/                    # Axios instance, typed API modules (auth, portfolio, deposit, withdraw)
│   └── react-query-keys.ts
├── components/             # Shared UI (LoadingState, EmptyState)
├── config/                 # Centralized env, auth, portfolio, deposit, withdraw config
├── constants.ts
├── contexts/               # authSession, register, theme, react-query providers
├── layout/                 # Core shell layouts (Auth, Main, Dashboard) + responsive hooks
├── routes/paths.ts         # Central PATHS constant
├── utils/                  # Shared formatters (currency, csv, display)
├── views/                  # Page components
│   ├── HomePage/
│   ├── Auth/               # Login, Register
│   └── dashboard/          # board, portfolio, deposit, withdraw, market, settings, investment_plan
└── asset/                  # Logo components
```

## Getting Started

### Prerequisites

- Node.js 20+ and **pnpm**
- A running backend API at `http://localhost:8001` (see **Environment** below)

### Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Base URL of the external backend API (e.g. `http://localhost:8001`) |

Create a `.env` file at the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8001
```

### Running Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Linting & Type Checking

```bash
pnpm lint          # eslint
pnpm tsc --noEmit  # type checking
```

## Deployment on Render

This is a fully static, client-side Next.js app that also ships server rendering. Recommended setup on **Render**:

1. **Create a new Web Service** and connect the GitHub repository.
2. **Build Command:** `pnpm install && pnpm build`
3. **Start Command:** `pnpm start`
4. **Root Directory:** `/` (or the subdirectory the app lives in).
5. **Environment variables:** set `NEXT_PUBLIC_BASE_URL` to your production backend URL.
6. Render will supply `NODE_ENV=production` and `PORT` automatically — Next.js `start` reads the platform port.

> Since all data fetching is client-side (React Query), no server-side credentials are needed at build time. `NEXT_PUBLIC_BASE_URL` must be set at build time so the frontend can reach your API.

> Render's free-tier web services sleep after inactivity — the first request may be slow.

## Highlights & Standing-Out Features

- **Next.js 16 + React 19 + MUI v7** — a current-gen stack, ahead of many production platforms.
- **Fully client-driven architecture** — a clean separation where the UI talks only to a backend API via a typed, centralized Axios layer.
- **Room-pure registration wizard** with reducer-driven state and per-step Zod validation.
- **Token-based session management** including expiry detection and seamless 401 handling that logs out and reloads.
- **Polished dashboard UX** — KPI cards, analytics charts (Recharts), holdings with CSV export, and complete deposit/withdraw flows with modals.
- **Dark/light theming** with a persistent toggle, central typography, and shared styling conventions.
- **Centralized `PATHS` routing** and per-module config files — endpoints and routes are never hardcoded in callers, keeping the codebase DRY and easy to navigate.