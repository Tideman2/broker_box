"use client";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import DashboardCard from "@/components/DashboardCard";
import { formatCurrency } from "@/utils/format";
import { allocationItemsWithPercent } from "../../utils";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState";

import AllocationLegend from "./components/AllocationLegend";

import type { AssetAllocationItem } from "@/api/portfolio/types";

type AssetAllocationProps = {
    items?: AssetAllocationItem[];
    totalValue?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function AssetAllocation({
    items = [],
    totalValue = 0,
    loading,
    error,
    onRetry,
}: AssetAllocationProps) {
    const theme = useTheme();

    const categoryColor = (category: string): string => {
        const upper = category.toUpperCase();
        if (upper === "FOREX") return theme.palette.primary.main;
        if (upper === "CRYPTO" || upper === "CRYPTOCURRENCY") return theme.palette.secondary.main;
        if (upper === "COMMODITY" || upper === "COMMODITIES") return theme.palette.success.main;
        if (upper === "INDEX" || upper === "INDICES") return theme.palette.warning.main;
        return theme.palette.text.primary;
    };
    const allocation = allocationItemsWithPercent(items);
    const hasData = allocation.length > 0;

    return (
        <DashboardCard
            title="Asset Allocation"
            icon={DonutSmallIcon}
            action={<Chip size="small" label="Live Data" color="primary" variant="outlined" />}
        >
            {loading ? (
                <LoadingState height={28} lines={6} />
            ) : error ? (
                <EmptyState
                    title="Allocation unavailable"
                    description="We could not load your asset allocation."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : !hasData ? (
                <EmptyState
                    icon={DonutSmallIcon}
                    title="No allocation yet"
                    description="Your portfolio allocation will appear here once you hold instruments."
                />
            ) : (
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: 160, sm: 180, md: 200 },
                            height: { xs: 160, sm: 180, md: 200 },
                            flexShrink: 0,
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={allocation}
                                    dataKey="percentage"
                                    nameKey="category"
                                    innerRadius="62%"
                                    outerRadius="100%"
                                    paddingAngle={2}
                                    stroke="none"
                                    isAnimationActive={false}
                                >
                                    {allocation.map((item, index) => (
                                        <Cell
                                            key={index}
                                            fill={categoryColor(item.symbol)}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                            }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                TOTAL
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {formatCurrency(totalValue, 0)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                100%
                            </Typography>
                        </Stack>
                    </Box>

                    <AllocationLegend
                        items={allocation.map((item) => ({
                            symbol: item.symbol,
                            color: categoryColor(item.symbol),
                            allocation_percentage: item.allocation_percentage,
                            value: item.value,
                        }))}
                    />
                </Stack>
            )}
        </DashboardCard>
    );
}