# AGENTS.md

Next.js 16 (App Router) + React 19 + MUI v7 frontend for a trading/broker platform. Pure client-side: no `src/app/api` route handlers — all data flows through axios to an external backend.

## Commands

- Package manager is **pnpm** (pnpm-lock.yaml + pnpm-workspace.yaml). Don't use npm/yarn.
- `pnpm dev` — dev server; `pnpm build`; `pnpm start`; `pnpm lint` (eslint only).
- No test framework or typecheck script. Verify types with `pnpm tsc --noEmit` (tsconfig sets `noEmit`).
- Path alias `@/*` → `./src/*`; all imports use it.

## Env / setup

- API base URL is `NEXT_PUBLIC_BASE_URL` (local dev: `http://localhost:8001` in `.env`). A local backend must be running there or login/register fail.
- `.env*` is gitignored. `.env.example` is **stale** — it contains `VITE_BASE_URL`, but the real variable is `NEXT_PUBLIC_BASE_URL`. Trust `src/config/env.ts`, not `.env.example`.

## Architecture

Route groups under `src/app`: `(landing)`, `(auth)`, `(dashboard)`. Entry points:

- `src/layout/core/` — `Auth.tsx`, `Main.tsx`, `Dashboard.tsx` shell layouts; dashboard has sidebar/navbar.
- `src/views/<feature>/` — page components (HomePage, Auth/Register, Auth/Login, dashboard/\*). `app/` pages are thin wrappers around these.
- `src/api/` — `index.ts` is the shared axios instance: injects `Authorization: Bearer <token>` from localStorage and, on `statusCode === 401`, clears the token and reloads. Endpoints and the token key live in `src/config/auth.ts`, not hardcoded in callers.
- `src/contexts/` — `authSession` (JWT session via `/auth/user` + `jwtDecode`), `register` (multi-step form reducer), `theme`, react-query provider.
- `src/routes/paths.ts` — central `PATHS` constant; reference routes via `PATHS`, always, never hardcode strings.
- `src/config/` — `global.ts`, `env.ts`, `auth.ts`.

## Gotchas

- Responses that look like Axios errors are already unwrapped: the interceptor rejects with `error.response ?? error`, so callers get `statusCode`/`result` directly, not the Axios wrapper.
- Registration is a 5-step wizard (`country → account → personal → address → finish`) driven by `useReducer` in `src/contexts/register/`. Step views validate with inline zod schemas (e.g. `AccountStep.tsx`). `confirmPassword` and `marketingOptIn` exist in register state but are dropped by `transformRegistrationData` in `src/api/auth/index.ts` — don't add them to API payloads without checking the backend contract.
- Dashboard route group is wrapped in `AuthProvider` (`src/app/(dashboard)/layout.tsx`); unauthenticated sessions are kicked to `/auth/login`.
- MUI styling uses `sx` prop / Emotion; themes (`darkTheme`/`lightTheme`) live in `src/app/theme.ts` and are toggled via `ThemeModeContext`. Styling conventions are central there, extend it rather than restyling per-component.
- Responsive layout uses the custom `useMediaQuery` hook in `src/layout/hook/` with named breakpoints (`upToSm`, `fromLg`, etc. in `const.ts`) — not MUI's `useMediaQuery` or `Breakpoint` types.
- TradingView widgets render a custom `<tv-ticker-tape>` element; its TS declaration lives in the repo-root `global.d.ts` — keep that file in sync when adding widget elements.

## Component Organization

- Do not create a top-level folder for every React component.
- A major or reusable feature/component may have its own folder with `index.tsx` as its entry point.
- Components that are only helpers or implementation details of a major feature MUST live inside that feature's `components/` directory.
- Do not promote feature-specific helper components to top-level folders.
- Before creating a new top-level component folder, determine whether the component is actually a major/reusable feature.
- Prefer the smallest reasonable component structure that preserves separation of concerns and reusability.

Example:

dashboard/
├── PortfolioCommand/
│ └── index.tsx
├── PortfolioStats/
│ ├── index.tsx
│ └── components/
│ └── StatCard.tsx
├── PortfolioAnalytics/
│ ├── index.tsx
│ └── components/
│ └── TimeframeSelector.tsx
├── ActiveStrategy/
│ └── index.tsx
├── MarketSentiment/
│ └── index.tsx
├── RecentTrades/
│ ├── index.tsx
│ └── components/
│ └── TradeRow.tsx
└── FinancialFlow/
├── index.tsx
└── components/
└── FlowItem.tsx

## Architecture Discipline

- Do not infer that every component mentioned in a specification deserves its own top-level folder.
- Treat examples in implementation prompts as guidance, not as a requirement to create every possible component.
- Before adding new files or folders, inspect the existing project structure and reuse the established architecture where appropriate.
- Avoid unnecessary abstractions, wrapper components, folders, and files.
- Prefer a simple structure over additional nesting unless the added structure provides a clear architectural benefit.

## Before Implementation

- For non-trivial features, inspect the existing architecture before creating files.
- First identify the appropriate feature boundary and component hierarchy.
- Do not create files or folders until the proposed structure is consistent with these rules and the existing repository.
- When a specification is ambiguous, choose the simplest structure consistent with the repository rather than creating additional abstractions.
