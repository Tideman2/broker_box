import { Box, Button, Stack, Skeleton, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { alpha } from "@mui/material/styles";

import { formatAmount, toNumber } from "./utils";
import { BALANCE_CAPTION, BALANCE_CHANGE_PERCENT } from "./mockContent";

type BalanceBannerProps = {
    balance?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function BalanceBanner({
    balance,
    loading,
    error,
    onRetry,
}: BalanceBannerProps) {
    const value = toNumber(balance);

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 3, md: 3.5 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                    `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.02)} 60%), ${theme.palette.background.paper}`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -70,
                    right: -70,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: (theme) =>
                        `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.25)}, transparent 70%)`,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    top: 22,
                    right: 22,
                    width: 56,
                    height: 56,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.12),
                }}
            >
                <AccountBalanceWalletIcon sx={{ fontSize: 30, color: "primary.main" }} />
            </Box>

            <Stack spacing={1} sx={{ position: "relative", maxWidth: { sm: "75%" } }}>
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.14em", fontWeight: 700 }}
                    color="text.secondary"
                >
                    Total Available Balance
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ flexWrap: "wrap", rowGap: 1 }}
                >
                    {loading ? (
                        <Skeleton width={220} height={52} sx={{ borderRadius: 1.5 }} />
                    ) : error ? (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Balance unavailable.
                            </Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={onRetry}
                                sx={{ borderRadius: 2, fontWeight: 600 }}
                            >
                                Retry
                            </Button>
                        </Stack>
                    ) : (
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {formatAmount(value, 0)}
                            </Typography>
                            <Box
                                component="span"
                                sx={{
                                    px: 1.25,
                                    py: 0.35,
                                    borderRadius: 999,
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.success.main, 0.12),
                                    color: "success.main",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                ↗ +{BALANCE_CHANGE_PERCENT}%
                            </Box>
                        </>
                    )}
                </Stack>

                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {BALANCE_CAPTION}
                </Typography>
            </Stack>
        </Box>
    );
}
