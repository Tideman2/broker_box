"use client";

import { Box, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { alpha } from "@mui/material/styles";

import { formatAmount } from "@/utils/format";

import { BALANCE_LABEL } from "../mockContent";

type AvailableBalanceBannerProps = {
    balance?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
    retryLabel: string;
    errorTitle: string;
    errorDescription: string;
    loadingLabel: string;
};

export default function AvailableBalanceBanner({
    balance,
    loading,
    error,
    onRetry,
    retryLabel,
    errorTitle,
    errorDescription,
    loadingLabel,
}: AvailableBalanceBannerProps) {
    return (
        <Box
            sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.14
                    )}, ${alpha(theme.palette.secondary.main, 0.06)})`,
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <AccountBalanceWalletIcon
                        sx={{ fontSize: 20, color: "primary.main" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {BALANCE_LABEL}
                    </Typography>
                </Stack>

                {loading && (
                    <Typography variant="caption" color="text.secondary">
                        {loadingLabel}
                    </Typography>
                )}
            </Stack>

            {error ? (
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }} color="error.main">
                        {errorTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {errorDescription}
                    </Typography>
                </Box>
            ) : loading ? (
                <Box
                    sx={{
                        mt: 1,
                        width: { xs: "100%", sm: 180 },
                        height: 34,
                        borderRadius: 1,
                        bgcolor: "background.paper",
                        opacity: 0.6,
                    }}
                />
            ) : (
                <Typography
                    variant="h4"
                    sx={{ mt: 0.5, wordBreak: "break-word" }}
                >
                    {formatAmount(balance ?? 0)}
                </Typography>
            )}

            {error && onRetry && (
                <Typography
                    component="button"
                    onClick={onRetry}
                    variant="caption"
                    sx={{
                        mt: 1,
                        p: 0,
                        border: 0,
                        background: "none",
                        color: "primary.main",
                        cursor: "pointer",
                        font: "inherit",
                    }}
                >
                    {retryLabel}
                </Typography>
            )}
        </Box>
    );
}
