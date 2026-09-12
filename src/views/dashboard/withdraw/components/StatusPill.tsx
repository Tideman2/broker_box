import { Box, useTheme, type BoxProps } from "@mui/material";

import { statusLabel, statusTone } from "./utils";

import type { WithdrawStatus } from "@/api/withdraw/types";

type StatusPillProps = {
    status: WithdrawStatus;
    sx?: BoxProps["sx"];
};

export default function StatusPill({ status, sx }: StatusPillProps) {
    const theme = useTheme();
    const color = theme.palette[statusTone(status)] as { main: string };

    return (
        <Box
            component="span"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 1,
                py: 0.25,
                borderRadius: 999,
                fontSize: "0.7rem",
                fontWeight: 600,
                lineHeight: 1.4,
                color: color.main,
                border: `1px solid ${color.main}33`,
                backgroundColor: `${color.main}1A`,
                whiteSpace: "nowrap",
                ...sx,
            }}
        >
            {statusLabel(status)}
        </Box>
    );
}