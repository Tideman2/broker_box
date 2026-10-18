"use client";

import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { alpha } from "@mui/material/styles";

import { BALANCE_LABEL } from "../mockContent";
import { useFormatCurrency } from "@/contexts/currency/hooks";

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
    const { formatAmount } = useFormatCurrency();
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                    `linear-gradient(120deg, ${alpha(
                        theme.palette.primary.main,
                        0.14
                    )}, ${alpha(theme.palette.secondary.main, 0.07)} 70%), ${
                        theme.palette.background.paper
                    }`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: (theme) =>
                        `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.22)}, transparent 70%)`,
                }}
            />
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                sx={{ position: "relative" }}
            >
                <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.14),
                        }}
                    >
                        <AccountBalanceWalletIcon
                            sx={{ fontSize: 22, color: "primary.main" }}
                        />
                    </Box>
                    <Stack spacing={0}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {BALANCE_LABEL}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Available for new subscriptions
                        </Typography>
                    </Stack>
                </Stack>

                {loading && (
                    <Typography variant="caption" color="text.secondary">
                        {loadingLabel}
                    </Typography>
                )}
            </Stack>

            {error ? (
                <Stack spacing={1} sx={{ mt: 1.5, position: "relative" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }} color="error.main">
                        {errorTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {errorDescription}
                    </Typography>
                    {onRetry && (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={onRetry}
                            sx={{ alignSelf: "flex-start", borderRadius: 2, fontWeight: 600 }}
                        >
                            {retryLabel}
                        </Button>
                    )}
                </Stack>
            ) : loading ? (
                <Skeleton
                    variant="rounded"
                    width={200}
                    height={40}
                    sx={{ mt: 1.5, borderRadius: 1.5 }}
                />
            ) : (
                <Typography
                    variant="h3"
                    sx={{
                        mt: 1,
                        position: "relative",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {formatAmount(balance ?? 0)}
                </Typography>
            )}
        </Box>
    );
}
