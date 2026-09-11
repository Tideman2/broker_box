"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import { PATHS } from "@/routes/paths";

export default function PortfolioHeader() {
    const router = useRouter();

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
        >
            <Box>
                <Typography variant="h4">Portfolio Analysis</Typography>
                <Typography variant="body2" color="text.secondary">
                    Analyze your asset distribution, risk profile, and real-time
                    performance across all linked trading strategies.
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    onClick={() => router.push(PATHS.dashboard.deposit)}
                >
                    Add Funds
                </Button>
                <Tooltip title="Coming soon">
                    <span>
                        <Button variant="outlined" disabled>
                            Rebalance Portfolio
                        </Button>
                    </span>
                </Tooltip>
            </Stack>
        </Stack>
    );
}