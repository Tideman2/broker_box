import { Box, useTheme, type BoxProps } from "@mui/material";

import { statusLabel, statusTone } from "@/utils/display";

import type { StatusTone } from "@/utils/display";

type StatusPillProps = {
    status: string;
    /** Overrides the label resolved from STATUS_LABELS. */
    label?: string;
    /** Overrides the tone resolved from STATUS_TONES. Needed for statuses
     *  whose keys are not in the shared maps, e.g. uppercase plan and
     *  subscription statuses. */
    tone?: StatusTone;
    sx?: BoxProps["sx"];
};

export default function StatusPill({
    status,
    label,
    tone,
    sx,
}: StatusPillProps) {
    const theme = useTheme();
    const resolved = (tone ?? statusTone(status)) as "success" | "error" | "info";
    const color = theme.palette[resolved] as { main: string };

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
            {label ?? statusLabel(status)}
        </Box>
    );
}
