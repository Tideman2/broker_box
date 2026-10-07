import { useRouter } from 'next/navigation';
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
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import { PATHS } from '@/routes/paths';

import TradeRow from './components/TradeRow';

import type { TradeResponse } from '@/api/portfolio/types';

const HEAD_CELLS = ['Asset', 'Type', 'Total Value', 'Date'];

type RecentTradesProps = {
    trades: TradeResponse[];
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function RecentTrades({
    trades,
    loading,
    error,
    onRetry,
}: RecentTradesProps) {
    const router = useRouter();

    return (
        <DashboardCard
            title="Recent Trades"
            icon={SwapHorizIcon}
            action={
                <Button
                    size="small"
                    sx={{ textTransform: 'none' }}
                    onClick={() => router.push(PATHS.dashboard.trades)}
                >
                    View all
                </Button>
            }
        >
            {loading ? (
                <LoadingState height={40} lines={5} />
            ) : error ? (
                <EmptyState
                    title="Recent trades unavailable"
                    description="We could not load your latest trades."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : trades.length === 0 ? (
                <EmptyState
                    icon={SwapHorizIcon}
                    title="No recent trades"
                    description="Your executed trades will appear here."
                />
            ) : (
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
                                <TradeRow key={trade.transaction_id} trade={trade} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </DashboardCard>
    );
}
