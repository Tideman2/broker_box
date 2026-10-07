"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { TRADES_CONTENT } from "../mockContent";

type TradesHeaderProps = {
    onExport: () => void;
    exportDisabled?: boolean;
};

export default function TradesHeader({
    onExport,
    exportDisabled,
}: TradesHeaderProps) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
        >
            <Box>
                <Typography variant="h4">{TRADES_CONTENT.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {TRADES_CONTENT.subtitle}
                </Typography>
            </Box>

            <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={onExport}
                disabled={exportDisabled}
            >
                {TRADES_CONTENT.export}
            </Button>
        </Stack>
    );
}