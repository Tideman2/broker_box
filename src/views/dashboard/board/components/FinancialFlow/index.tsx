import {
    Box,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DashboardCard from '@/components/DashboardCard';

import type { FinancialFlowData } from '@/views/dashboard/board/mockData';
import { formatCurrency } from '@/views/dashboard/board/utils';

import FlowItem from './components/FlowItem';

type FinancialFlowProps = {
    data: FinancialFlowData;
};

export default function FinancialFlow({ data }: FinancialFlowProps) {
    return (
        <DashboardCard title="Financial Flow" icon={AccountBalanceWalletIcon}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} mb={2}>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                        Current Balance
                    </Typography>
                    <Typography variant="h5">
                        {formatCurrency(data.balance)}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                        Available Balance
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {formatCurrency(data.availableBalance)}
                    </Typography>
                </Box>
            </Stack>

            <Divider />

            <Grid container spacing={{ xs: 0, sm: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="success.main" mt={2} mb={1}>
                        Money In
                    </Typography>
                    <Stack divider={<Divider flexItem />}>
                        {data.inflow.map((entry) => (
                            <FlowItem key={entry.label} entry={entry} type="in" />
                        ))}
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="error.main" mt={2} mb={1}>
                        Money Out
                    </Typography>
                    <Stack divider={<Divider flexItem />}>
                        {data.outflow.map((entry) => (
                            <FlowItem key={entry.label} entry={entry} type="out" />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </DashboardCard>
    );
}