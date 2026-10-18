"use client";

import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DetailRow from "@/components/DetailRow";

import { PATHS } from "@/routes/paths";

import { useRouter } from "next/navigation";
import { useFormatCurrency } from "@/contexts/currency/hooks";

import {
    BACK_LABEL,
    SUCCESS_AMOUNT_LABEL,
    SUCCESS_DESCRIPTION,
    SUCCESS_POOL_LABEL,
    SUCCESS_REMAINING_LABEL,
    SUCCESS_TITLE,
    VIEW_PORTFOLIO_LABEL,
} from "../mockContent";

type SubscriptionSuccessProps = {
    planTitle: string;
    investedAmount: number;
    /** Spendable cash held inside the new subscription. */
    pool?: number;
    remainingBalance: number;
};

export default function SubscriptionSuccess({
    planTitle,
    investedAmount,
    pool,
    remainingBalance,
}: SubscriptionSuccessProps) {
    const { formatAmount } = useFormatCurrency();
    const router = useRouter();

    return (
        <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            <Stack spacing={2.5} alignItems="center" textAlign="center">
                <Box
                    sx={{
                        width: 88,
                        height: 88,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.success.main, 0.12),
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 52, color: "success.main" }} />
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        {SUCCESS_TITLE}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {SUCCESS_DESCRIPTION.replace("{title}", planTitle)}
                    </Typography>
                </Box>

                <Stack
                    spacing={1.25}
                    width="100%"
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.text.primary, 0.015),
                        textAlign: "left",
                    }}
                    divider={<Divider sx={{ borderColor: "divider" }} />}
                >
                    <DetailRow
                        label={SUCCESS_AMOUNT_LABEL}
                        value={formatAmount(investedAmount)}
                    />
                    {/* Omitted rather than defaulted when the field is absent,
                        so an older backend cannot show a fabricated $0.00. */}
                    {pool != null && (
                        <DetailRow
                            label={SUCCESS_POOL_LABEL}
                            value={formatAmount(pool)}
                        />
                    )}
                    <DetailRow
                        label={SUCCESS_REMAINING_LABEL}
                        value={formatAmount(remainingBalance)}
                    />
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    width="100%"
                >
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => router.push(PATHS.dashboard.portfolio)}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                        {VIEW_PORTFOLIO_LABEL}
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={() =>
                            router.push(PATHS.dashboard.investmentplans)
                        }
                        sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                        {BACK_LABEL}
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}
