import { Box, useTheme, type BoxProps } from "@mui/material";
import { CheckCircleOutline, ErrorOutline, InfoOutlined } from "@mui/icons-material";

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

const TONE_ICONS = {
    success: CheckCircleOutline,
    error: ErrorOutline,
    info: InfoOutlined,
} as const;

export default function StatusPill({
    status,
    label,
    tone,
    sx,
}: StatusPillProps) {
    const theme = useTheme();
    const resolved = (tone ?? statusTone(status)) as "success" | "error" | "info";
    const color = theme.palette[resolved] as { main: string };
    const ToneIcon = TONE_ICONS[resolved];

    return (
        <Box
            component="span"
            role="status"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                fontSize: "0.75rem",
                fontWeight: 600,
                lineHeight: 1.5,
                letterSpacing: "0.01em",
                color: color.main,
                border: `1px solid ${color.main}33`,
                backgroundColor: `${color.main}1A`,
                whiteSpace: "nowrap",
                ...sx,
            }}
        >
            <ToneIcon sx={{ fontSize: 14 }} aria-hidden="true" />
            {label ?? statusLabel(status)}
        </Box>
    );
}
