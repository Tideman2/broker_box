'use client';

import { Tabs, Tab } from '@mui/material';

import type { PortfolioTimeframe } from '@/views/dashboard/board/mockData';

const TIMEFRAMES: PortfolioTimeframe[] = ['1D', '1W', '1M', '1Y', 'ALL'];

type TimeframeSelectorProps = {
    value: PortfolioTimeframe;
    onChange: (value: PortfolioTimeframe) => void;
};

export default function TimeframeSelector({
    value,
    onChange,
}: TimeframeSelectorProps) {
    return (
        <Tabs
            value={value}
            onChange={(_event, nextValue) => onChange(nextValue as PortfolioTimeframe)}
            sx={{
                minHeight: 32,
                '& .MuiTab-root': {
                    minHeight: 32,
                    px: 1.5,
                    py: 0.5,
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                },
                '& .MuiTab-root.Mui-selected': {
                    color: 'primary.main',
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: 'primary.main',
                    height: 2,
                },
            }}
        >
            {TIMEFRAMES.map((timeframe) => (
                <Tab key={timeframe} value={timeframe} label={timeframe} />
            ))}
        </Tabs>
    );
}