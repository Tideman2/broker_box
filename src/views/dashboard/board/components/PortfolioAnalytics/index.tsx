'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import DashboardCard from '@/components/DashboardCard';

import type {
    PortfolioAnalyticsData,
    PortfolioTimeframe,
} from '@/views/dashboard/board/mockData';

import TimeframeSelector from './components/TimeframeSelector';
import ChartTooltip from './components/ChartTooltip';
import { useFormatCurrency } from "@/contexts/currency/hooks";

type PortfolioAnalyticsProps = {
    data: PortfolioAnalyticsData;
    defaultTimeframe?: PortfolioTimeframe;
};

export default function PortfolioAnalytics({
    data,
    defaultTimeframe = '1M',
}: PortfolioAnalyticsProps) {
    const { formatCurrency } = useFormatCurrency();
    const theme = useTheme();
    const [timeframe, setTimeframe] =
        useState<PortfolioTimeframe>(defaultTimeframe);

    const points = data[timeframe];

    return (
        <DashboardCard
            title="Portfolio Analytics"
            icon={ShowChartIcon}
            action={
                <TimeframeSelector
                    value={timeframe}
                    onChange={setTimeframe}
                />
            }
        >
            <Box sx={{ height: { xs: 240, md: 320 }, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={points}
                        margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="analyticsGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={theme.palette.primary.main}
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={theme.palette.primary.main}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.palette.divider}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="date"
                            tick={{
                                fill: theme.palette.text.secondary,
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            minTickGap={28}
                        />

                        <YAxis
                            tick={{
                                fill: theme.palette.text.secondary,
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={64}
                            tickFormatter={(value: number) =>
                                formatCurrency(value, 0)
                            }
                        />

                        <Tooltip
                            content={<ChartTooltip />}
                            cursor={{
                                stroke: theme.palette.primary.main,
                                strokeOpacity: 0.4,
                                strokeDasharray: '4 4',
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={theme.palette.primary.main}
                            strokeWidth={2.5}
                            fill="url(#analyticsGradient)"
                            dot={false}
                            activeDot={{
                                r: 4,
                                strokeWidth: 2,
                                stroke: theme.palette.background.paper,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </DashboardCard>
    );
}