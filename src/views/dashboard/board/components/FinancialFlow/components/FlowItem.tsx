import { Stack, Typography } from '@mui/material';

import type { FlowEntry } from '@/views/dashboard/board/mockData';
import { formatCurrency } from '@/views/dashboard/board/utils';

type FlowItemProps = {
    entry: FlowEntry;
    type: 'in' | 'out';
};

export default function FlowItem({ entry, type }: FlowItemProps) {
    const isIn = type === 'in';

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            py={1}
        >
            <Stack>
                <Typography variant="body2">{entry.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {entry.date}
                </Typography>
            </Stack>

            <Typography
                variant="body2"
                fontWeight={600}
                color={isIn ? 'success.main' : 'error.main'}
            >
                {isIn ? '+' : '−'}
                {formatCurrency(entry.amount)}
            </Typography>
        </Stack>
    );
}