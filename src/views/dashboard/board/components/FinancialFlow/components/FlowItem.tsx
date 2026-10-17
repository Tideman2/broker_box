import { Box, Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import type { FlowEntry } from '@/views/dashboard/board/mockData';
import { useFormatCurrency } from "@/contexts/currency/hooks";

type FlowItemProps = {
    entry: FlowEntry;
    type: 'in' | 'out';
};

export default function FlowItem({ entry, type }: FlowItemProps) {
    const { formatCurrency } = useFormatCurrency();
    const isIn = type === 'in';

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            py={1.25}
        >
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isIn ? 'success.main' : 'error.main',
                        bgcolor: 'transparent',
                        border: '1px solid',
                        borderColor: isIn ? 'success.main' : 'error.main',
                    }}
                >
                    {isIn ? (
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                    ) : (
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                    )}
                </Box>
                <Stack>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {entry.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {entry.date}
                    </Typography>
                </Stack>
            </Stack>

            <Typography
                variant="body2"
                fontWeight={700}
                color={isIn ? 'success.main' : 'error.main'}
                sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
                {isIn ? '+' : '−'}
                {formatCurrency(entry.amount)}
            </Typography>
        </Stack>
    );
}