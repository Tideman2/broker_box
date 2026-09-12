"use client";

import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import DashboardCard from "@/components/DashboardCard";

import EmptyState from "@/components/EmptyState";

type Timeframe = "7D" | "1M";

type PerformanceGrowthProps = {
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function PerformanceGrowth(_props: PerformanceGrowthProps) {
    const [timeframe, setTimeframe] = useState<Timeframe>("7D");

    return (
        <DashboardCard
            title="Performance Growth"
            icon={ShowChartIcon}
            action={
                <Tabs
                    value={timeframe}
                    onChange={(_event, nextValue) => setTimeframe(nextValue as Timeframe)}
                    sx={{
                        minHeight: 32,
                        "& .MuiTab-root": {
                            minHeight: 32,
                            px: 1.5,
                            py: 0.5,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            color: "text.secondary",
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "primary.main",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "primary.main",
                            height: 2,
                        },
                    }}
                >
                    <Tab value="7D" label="7D" />
                    <Tab value="1M" label="1M" />
                </Tabs>
            }
        >
            <EmptyState
                icon={ShowChartIcon}
                title="Historical performance coming soon"
                description="A net-value trend for the selected period will appear here once a time-series endpoint is available."
            />
        </DashboardCard>
    );
}
