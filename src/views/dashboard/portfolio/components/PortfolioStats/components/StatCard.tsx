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

const STATUS_COLOR: Record<NonNullable<KpiStat["status"]>, string> = {
    success: "success.main",
    warning: "warning.main",
    error: "error.main",
    neutral: "info.main",
};

const MEDIUM_SX: SxProps<Theme> = { fontSize: "1.1rem", whiteSpace: "nowrap" };

type StatCardProps = {
    stat: KpiStat;
};

export default function StatCard({ stat }: StatCardProps) {
    const isUp = stat.trend === "up";
    const statusColor = stat.status ? STATUS_COLOR[stat.status] : undefined;

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
                            label={stat.statusLabel}
                            sx={{
                                color: statusColor,
                                bgcolor: "transparent",
                                pl: 0,
                            }}
                        />
                    ) : stat.trend && stat.changePct !== undefined ? (
                        <Chip
                            size="small"
                            icon={
                                isUp ? (
                                    <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                                ) : (
                                    <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )
                            }
                            label={formatPercent(stat.changePct)}
                            sx={{
                                color: isUp ? "success.main" : "error.main",
                                bgcolor: "transparent",
                                pl: 0,
                                "& .MuiChip-icon": {
                                    color: isUp ? "success.main" : "error.main",
                                },
                            }}
                        />
                    ) : null}
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    {stat.label}
                </Typography>

                <Tooltip title={stat.statusLabel ?? stat.label}>
                    <Typography variant="h6" sx={MEDIUM_SX}>
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
