import { Button, Divider, Skeleton, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import DashboardCard from "@/components/DashboardCard";
import DetailRow from "@/components/DetailRow";

import { truncateAddress } from "@/utils/display";

import { PAYMENT_METHOD_LABELS } from "./mockContent";
import { METHOD_CRYPTO } from "./PaymentMethodTabs";

import type { AssetResponse } from "@/api/types";
import { useFormatCurrency } from "@/contexts/currency/hooks";

type DepositSummaryProps = {
    asset: AssetResponse | null;
    balance?: number;
    balanceLoading?: boolean;
    balanceError?: boolean;
    onBalanceRetry?: () => void;
};

export default function DepositSummary({
    asset,
    balance,
    balanceLoading,
    balanceError,
    onBalanceRetry,
}: DepositSummaryProps) {
    const { formatAmount } = useFormatCurrency();
    return (
        <DashboardCard
            title="Deposit Summary"
            icon={AccountBalanceWalletIcon}
            sx={{
                position: { lg: "sticky" },
                top: { lg: 88 },
                zIndex: { lg: 1 },
            }}
        >
            <Stack spacing={1.5}>
                <Stack spacing={0.25}>
                    <Typography variant="caption" color="text.secondary">
                        Available Balance
                    </Typography>
                    {balanceLoading ? (
                        <Skeleton width={120} height={36} />
                    ) : balanceError ? (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={onBalanceRetry}
                            sx={{ alignSelf: "flex-start", borderRadius: 2 }}
                        >
                            Retry
                        </Button>
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: "primary.main",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {formatAmount(balance ?? 0)}
                        </Typography>
                    )}
                </Stack>

                <Divider sx={{ borderColor: "divider" }} />

                <Stack spacing={1.25} divider={<Divider sx={{ borderColor: "divider" }} />}>
                    <DetailRow
                        label="Asset"
                        value={asset ? `${asset.symbol} — ${asset.name}` : "—"}
                    />
                    <DetailRow
                        label="Method"
                        value={
                            asset
                                ? PAYMENT_METHOD_LABELS[METHOD_CRYPTO]
                                : "—"
                        }
                    />
                    <DetailRow
                        label="Network"
                        value={asset ? asset.name : "—"}
                    />
                    <DetailRow
                        label="Wallet Address"
                        value={
                            asset
                                ? asset.address
                                    ? truncateAddress(asset.address, 12, 8)
                                    : "Unavailable"
                                : "—"
                        }
                    />
                </Stack>
            </Stack>
        </DashboardCard>
    );
}
