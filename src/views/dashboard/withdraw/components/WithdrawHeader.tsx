"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

type WithdrawHeaderProps = {
    onViewHistory: () => void;
};

export default function WithdrawHeader({ onViewHistory }: WithdrawHeaderProps) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
        >
            <Box>
                <Typography variant="h4">Withdraw Funds</Typography>
                <Typography variant="body2" color="text.secondary">
                    Safely transfer your profits to your external wallets.
                </Typography>
            </Box>

            <Button variant="outlined" startIcon={<HistoryIcon />} onClick={onViewHistory}>
                View Full History
            </Button>
        </Stack>
    );
}