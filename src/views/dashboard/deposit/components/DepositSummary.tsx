import { Button, Divider, Skeleton, Stack, Typography } from "@mui/material";

import DashboardCard from "@/components/DashboardCard";
import DetailRow from "@/components/DetailRow";

import { truncateAddress } from "@/utils/display";
import { formatAmount } from "@/utils/format";
import { PAYMENT_METHOD_LABELS } from "./mockContent";
import { METHOD_CRYPTO } from "./PaymentMethodTabs";

import type { AssetResponse } from "@/api/types";

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
    return (
        <DashboardCard title="Deposit Summary">
            <Stack spacing={1.25} divider={<Divider sx={{ borderColor: "divider" }} />}>
                <DetailRow
                    label="Available Balance"
                    valueNode={
                        balanceLoading ? (
                            <Skeleton width={80} height={20} />
                        ) : balanceError ? (
                            <Button size="small" variant="outlined" onClick={onBalanceRetry}>
                                Retry
                            </Button>
                        ) : (
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, textAlign: "right" }}
                            >
                                {formatAmount(balance ?? 0)}
                            </Typography>
                        )
                    }
                />
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
        </DashboardCard>
    );
}