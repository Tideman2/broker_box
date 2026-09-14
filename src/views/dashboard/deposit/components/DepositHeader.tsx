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
                <Typography variant="h4">Deposit Funds</Typography>
                <Typography variant="body2" color="text.secondary">
                    Fund your account to start trading and investing.
                </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                    disabled={refreshing}
                >
                    Refresh Balance
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ExploreIcon />}
                    onClick={() => router.push(PATHS.dashboard.investmentplans)}
                >
                    Explore Plans
                </Button>
            </Stack>
        </Stack>
    );
}