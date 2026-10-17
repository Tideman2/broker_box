import { Chip, Stack, TableCell, TableRow, Typography } from '@mui/material';

import { executedAtParts } from '@/views/dashboard/trades/utils';
import { tradeTypeColor } from '@/views/dashboard/trades/components/TradesTable/components/TradeRow';

import type { TradeResponse } from '@/api/portfolio/types';
import { useFormatCurrency } from "@/contexts/currency/hooks";

type TradeRowProps = {
    trade: TradeResponse;
};

export default function TradeRow({ trade }: TradeRowProps) {
    const { formatAmount } = useFormatCurrency();
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
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                    }}
                />
            </TableCell>

            <TableCell align="right">
                <Typography
                    variant="body2"
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                >
                    {formatAmount(trade.total_value)}
                </Typography>
            </TableCell>

            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <Stack spacing={0} alignItems="flex-end">
                    <Typography
                        variant="body2"
                        sx={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {executed.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {executed.time}
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
