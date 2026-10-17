import { Box, Typography } from '@mui/material';
import { useFormatCurrency } from "@/contexts/currency/hooks";

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
    const { formatCurrency } = useFormatCurrency();
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
                py: 1.25,
                boxShadow: 4,
                minWidth: 132,
            }}
        >
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
                {label}
            </Typography>
            <Typography
                variant="body2"
                color="primary.main"
                fontWeight={700}
                sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
                {formatCurrency(value, 0)}
            </Typography>
        </Box>
    );
}