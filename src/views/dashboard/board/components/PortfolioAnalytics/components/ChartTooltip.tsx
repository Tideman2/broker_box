import { Box, Typography } from '@mui/material';

import { formatCurrency } from '@/views/dashboard/board/utils';

type ChartTooltipProps = {
    active?: boolean;
    payload?: Array<{ value?: number | string }>;
    label?: string | number;
};

export default function ChartTooltip({
    active,
    payload,
    label,
}: ChartTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const value = typeof payload[0].value === 'number' ? payload[0].value : 0;

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                px: 2,
                py: 1.5,
                boxShadow: 4,
            }}
        >
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2" color="primary.main" fontWeight={600}>
                {formatCurrency(value, 0)}
            </Typography>
        </Box>
    );
}