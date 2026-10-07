import { Chip, Stack, TableCell, TableRow, Typography } from '@mui/material';

import { formatAmount } from '@/utils/format';
import { executedAtParts } from '@/views/dashboard/trades/utils';
import { tradeTypeColor } from '@/views/dashboard/trades/components/TradesTable/components/TradeRow';

import type { TradeResponse } from '@/api/portfolio/types';

type TradeRowProps = {
    trade: TradeResponse;
};

export default function TradeRow({ trade }: TradeRowProps) {
    const color = tradeTypeColor(trade.type);
    const executed = executedAtParts(trade.executed_at);

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {trade.symbol}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {trade.name}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={trade.type}
                    sx={{
                        color,
                        border: '1px solid',
                        borderColor: color,
                        bgcolor: 'transparent',
                    }}
                />
            </TableCell>

            <TableCell>
                <Typography variant="body2">
                    {formatAmount(trade.total_value)}
                </Typography>
            </TableCell>

            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Stack spacing={0}>
                    <Typography variant="body2">{executed.date}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {executed.time}
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
