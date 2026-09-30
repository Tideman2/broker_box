"use client";

import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { PATHS } from "@/routes/paths";
import { formatAmount } from "@/utils/format";
import { useRouter } from "next/navigation";

import {
    BACK_LABEL,
    SUCCESS_AMOUNT_LABEL,
    SUCCESS_DESCRIPTION,
    SUCCESS_REMAINING_LABEL,
    SUCCESS_TITLE,
    VIEW_PORTFOLIO_LABEL,
} from "../mockContent";

type SubscriptionSuccessProps = {
    planTitle: string;
    investedAmount: number;
    remainingBalance: number;
};

export default function SubscriptionSuccess({
    planTitle,
    investedAmount,
    remainingBalance,
}: SubscriptionSuccessProps) {
    const router = useRouter();

    return (
        <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2.5} alignItems="center" textAlign="center">
                <CheckCircleIcon sx={{ fontSize: 56, color: "success.main" }} />

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {SUCCESS_TITLE}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {SUCCESS_DESCRIPTION.replace("{title}", planTitle)}
                    </Typography>
                </Box>

                <Stack
                    spacing={1.25}
                    width="100%"
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {SUCCESS_AMOUNT_LABEL}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatAmount(investedAmount)}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {SUCCESS_REMAINING_LABEL}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatAmount(remainingBalance)}
                        </Typography>
                    </Stack>
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
                    >
                        {BACK_LABEL}
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}
