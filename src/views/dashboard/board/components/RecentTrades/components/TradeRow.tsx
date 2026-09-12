import {
    Box,
    Chip,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';

import type { Trade } from '@/views/dashboard/board/mockData';
import { formatCurrency } from '@/views/dashboard/board/utils';

const TYPE_COLOR = {
    Buy: 'success.main',
    Sell: 'error.main',
};

type TradeRowProps = {
    trade: Trade;
};

export default function TradeRow({ trade }: TradeRowProps) {
    const typeColor = TYPE_COLOR[trade.type];

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: typeColor,
                        }}
                    />
                    <Box>
                        <Typography variant="body2">{trade.asset}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {trade.time}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={trade.type}
                    sx={{
                        color: typeColor,
                        border: '1px solid',
                        borderColor: typeColor,
                        bgcolor: 'transparent',
                    }}
                />
            </TableCell>

            <TableCell>
                <Typography variant="body2">{formatCurrency(trade.price)}</Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <Typography variant="caption" color="text.secondary">
                    {trade.status}
                </Typography>
            </TableCell>
        </TableRow>
    );
}