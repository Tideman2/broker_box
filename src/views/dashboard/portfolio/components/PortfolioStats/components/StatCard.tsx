import type { ElementType } from "react";
import {
    Card,
    Chip,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { SxProps, Theme } from "@mui/material/styles";

import { formatPercent } from "@/utils/format";

export type KpiStat = {
    id: string;
    label: string;
    value: string;
    icon: ElementType;
    trend?: "up" | "down";
    changePct?: number;
    status?: "success" | "warning" | "error" | "neutral";
    statusLabel?: string;
    caption?: string;
};

const STATUS_CHIP_COLOR: Record<
    NonNullable<KpiStat["status"]>,
    "success" | "warning" | "error" | "info"
> = {
    success: "success",
    warning: "warning",
    error: "error",
    neutral: "info",
};

const MEDIUM_SX: SxProps<Theme> = { fontSize: "1.1rem", whiteSpace: "nowrap" };

type StatCardProps = {
    stat: KpiStat;
};

export default function StatCard({ stat }: StatCardProps) {
    const isUp = stat.trend === "up";

    return (
        <Card sx={{ p: 2, height: "100%" }}>
            <Stack spacing={1}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <stat.icon sx={{ color: "primary.main", fontSize: 22 }} />
                    {stat.status && stat.statusLabel ? (
                        <Chip
                            size="small"
                            color={STATUS_CHIP_COLOR[stat.status]}
                            label={stat.statusLabel}
                            sx={{
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                            }}
                        />
                    ) : stat.trend && stat.changePct !== undefined ? (
                        <Chip
                            size="small"
                            color={isUp ? "success" : "error"}
                            icon={
                                isUp ? (
                                    <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                                ) : (
                                    <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )
                            }
                            label={formatPercent(stat.changePct)}
                            sx={{
                                fontWeight: 600,
                                "& .MuiChip-icon": { fontSize: 14 },
                            }}
                        />
                    ) : null}
                </Stack>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                    }}
                >
                    {stat.label}
                </Typography>

                <Tooltip title={stat.statusLabel ?? stat.label}>
                    <Typography
                        variant="h6"
                        sx={{
                            ...MEDIUM_SX,
                            fontWeight: 700,
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {stat.value}
                    </Typography>
                </Tooltip>

                {stat.caption && (
                    <Typography variant="caption" color="text.secondary">
                        {stat.caption}
                    </Typography>
                )}
            </Stack>
        </Card>
    );
}
