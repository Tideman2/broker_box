import {
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import DashboardCard from '@/components/DashboardCard';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import { useFormatCurrency } from '@/contexts/currency/hooks';

import FlowItem from './components/FlowItem';

import type { MoneyFlowItem } from '@/api/wallet/types';

type FinancialFlowProps = {
    moneyIn: MoneyFlowItem[];
    moneyOut: MoneyFlowItem[];
    /** Omitted until the dashboard's balance queries have settled. */
    balance?: number;
    availableBalance?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function FinancialFlow({
    moneyIn,
    moneyOut,
    balance,
    availableBalance,
    loading,
    error,
    onRetry,
}: FinancialFlowProps) {
    const { formatCurrency } = useFormatCurrency();

    return (
        <DashboardCard title="Money Flow" icon={AccountBalanceWalletIcon}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
                    >
                        Current Balance
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                    >
                        {balance != null ? formatCurrency(balance) : '—'}
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
                    >
                        Available Balance
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {availableBalance != null
                            ? formatCurrency(availableBalance)
                            : '—'}
                    </Typography>
                </Box>
            </Stack>

            <Divider />

            {loading ? (
                <LoadingState height={40} lines={4} />
            ) : error ? (
                <EmptyState
                    title="Money flow unavailable"
                    description="We could not load your recent money movements."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : (
                <Grid container spacing={{ xs: 3, sm: 4 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="subtitle2"
                            color="success.main"
                            mt={2}
                            mb={1}
                            sx={{
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.06em',
                            }}
                        >
                            Money In
                        </Typography>
                        {moneyIn.length === 0 ? (
                            <EmptyState
                                icon={ArrowDownwardIcon}
                                title="No money in yet"
                                description="Deposits and plan payouts will appear here."
                            />
                        ) : (
                            <Stack divider={<Divider flexItem />}>
                                {moneyIn.map((item) => (
                                    <FlowItem
                                        key={`${item.type}-${item.id}`}
                                        item={item}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="subtitle2"
                            color="error.main"
                            mt={2}
                            mb={1}
                            sx={{
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.06em',
                            }}
                        >
                            Money Out
                        </Typography>
                        {moneyOut.length === 0 ? (
                            <EmptyState
                                icon={ArrowUpwardIcon}
                                title="No money out yet"
                                description="Withdrawals and plan investments will appear here."
                            />
                        ) : (
                            <Stack divider={<Divider flexItem />}>
                                {moneyOut.map((item) => (
                                    <FlowItem
                                        key={`${item.type}-${item.id}`}
                                        item={item}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            )}
        </DashboardCard>
    );
}
