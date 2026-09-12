import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import DashboardCard from '@/components/DashboardCard';

import type { Trade } from '@/views/dashboard/board/mockData';

import TradeRow from './components/TradeRow';

const HEAD_CELLS = ['Asset', 'Type', 'Price', 'Status'];

type RecentTradesProps = {
    trades: Trade[];
};

export default function RecentTrades({ trades }: RecentTradesProps) {
    return (
        <DashboardCard
            title="Recent Trades"
            icon={SwapHorizIcon}
            action={
                <Button size="small" sx={{ textTransform: 'none' }}>
                    View all
                </Button>
            }
        >
            <TableContainer sx={{ mx: { xs: -2, md: -3 }, width: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {HEAD_CELLS.map((cell, index) => (
                                <TableCell
                                    key={cell}
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        display:
                                            index === 3
                                                ? { xs: 'none', sm: 'table-cell' }
                                                : undefined,
                                    }}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades.map((trade) => (
                            <TradeRow key={trade.id} trade={trade} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    );
}