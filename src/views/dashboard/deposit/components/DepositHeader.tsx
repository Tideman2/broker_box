import { Box, Button, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExploreIcon from "@mui/icons-material/Explore";
import { useRouter } from "next/navigation";

import { PATHS } from "@/routes/paths";

type DepositHeaderProps = {
    onRefresh: () => void;
    refreshing?: boolean;
};

export default function DepositHeader({ onRefresh, refreshing }: DepositHeaderProps) {
    const router = useRouter();

    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
        >
            <Box>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
                >
                    Deposit Funds
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Fund your account to start trading and investing.
                </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                    disabled={refreshing}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    {refreshing ? "Refreshing..." : "Refresh Balance"}
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    startIcon={<ExploreIcon />}
                    onClick={() => router.push(PATHS.dashboard.investmentplans)}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    Explore Plans
                </Button>
            </Stack>
        </Stack>
    );
}
