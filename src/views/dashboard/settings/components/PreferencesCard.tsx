"use client";

import {
    Alert,
    Divider,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DashboardCard from "@/components/DashboardCard";
import { getPreferences, updatePreferences } from "@/app/actions/settings-actions";
import { settingsQueryKeys } from "@/api/react-query-keys";
import { useCurrency } from "@/contexts/currency/hooks";
import { useThemeMode } from "@/contexts/theme/hooks";

import type { CurrencyDisplay, Preferences } from "@/api/auth/types";

const CURRENCY_OPTIONS: { value: CurrencyDisplay; label: string }[] = [
    { value: "usd", label: "USD — US Dollar" },
    { value: "eur", label: "EUR — Euro" },
    { value: "gbp", label: "GBP — British Pound" },
];

const THEME_OPTIONS: { value: "light" | "dark" | "system"; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System default" },
];

/**
 * Theme is client-only — the API has no theme field — so it is applied through
 * the theme context. Currency is stored server-side, and is only applied
 * locally once the API confirms it, so the rest of the dashboard never renders
 * an amount in a currency the server rejected.
 */
export default function PreferencesCard() {
    const queryClient = useQueryClient();
    const { mode, setMode } = useThemeMode();
    const { currency, setCurrency } = useCurrency();

    const preferencesQuery = useQuery({
        queryKey: settingsQueryKeys.preferences,
        queryFn: getPreferences,
        refetchOnWindowFocus: false,
    });

    /**
     * The PATCH echoes the full stored object, so one write updates the shared
     * cache, the rendered currency, and the stored fast path together.
     */
    const applyPreferences = (preferences: Preferences) => {
        queryClient.setQueryData(settingsQueryKeys.preferences, preferences);
        setCurrency(preferences.currency_display);
    };

    const currencyMutation = useMutation({
        mutationFn: (next: CurrencyDisplay) =>
            updatePreferences({ currency_display: next }),
        onSuccess: (result) => {
            if (!result.success) return; // `error` is rendered from the query.
            applyPreferences(result.data);
        },
    });

    const loadError =
        preferencesQuery.isError || !preferencesQuery.data
            ? "Preferences could not be loaded. Changes may not be saved."
            : undefined;

    return (
        <DashboardCard
            title="Preferences"
            icon={TuneOutlinedIcon}
            sx={{ position: { lg: "sticky" }, top: { lg: 88 }, zIndex: { lg: 1 } }}
        >
            <Stack spacing={2}>
                {loadError && <Alert severity="warning">{loadError}</Alert>}

                <TextField
                    select
                    label="Theme"
                    value={mode}
                    onChange={(event) =>
                        setMode(event.target.value as typeof mode)
                    }
                    fullWidth
                >
                    {THEME_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Currency display"
                    value={currency}
                    onChange={(event) =>
                        currencyMutation.mutate(event.target.value as CurrencyDisplay)
                    }
                    error={currencyMutation.isError}
                    helperText={
                        currencyMutation.isError
                            ? "That currency could not be saved. Please try again."
                            : "Applies to every amount shown in the dashboard."
                    }
                    fullWidth
                    disabled={currencyMutation.isPending}
                >
                    {CURRENCY_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Divider sx={{ borderColor: "divider" }} />

                <Alert severity="info">
                    Your theme and currency are remembered on this device and,
                    for currency, on your account.
                </Alert>
            </Stack>
        </DashboardCard>
    );
}
