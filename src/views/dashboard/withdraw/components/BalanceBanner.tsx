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
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
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
            <AccountBalanceWalletIcon
                sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    fontSize: 48,
                    color: (theme) => alpha(theme.palette.primary.main, 0.35),
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    left: 16,
                    bottom: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 4px)",
                    gap: "4px",
                    opacity: 0.35,
                }}
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.secondary.main, 0.6),
                        }}
                    />
                ))}
            </Box>

            <Stack spacing={1} sx={{ position: "relative" }}>
                <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>
                    TOTAL AVAILABLE BALANCE
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1.5}
                >
                    {loading ? (
                        <Skeleton width={220} height={48} />
                    ) : error ? (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Balance unavailable.
                            </Typography>
                            <Button size="small" variant="outlined" onClick={onRetry}>
                                Retry
                            </Button>
                        </Stack>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                {formatAmount(value, 0)}
                            </Typography>
                            <Box
                                component="span"
                                sx={{
                                    px: 1.25,
                                    py: 0.25,
                                    borderRadius: 999,
                                    border: "1px solid",
                                    borderColor: "success.main",
                                    color: "success.main",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    display: "inline-flex",
                                    alignItems: "center",
                                }}
                            >
                                ↗ +{BALANCE_CHANGE_PERCENT}%
                            </Box>
                        </>
                    )}
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    {BALANCE_CAPTION}
                </Typography>
            </Stack>
        </Box>
    );
}