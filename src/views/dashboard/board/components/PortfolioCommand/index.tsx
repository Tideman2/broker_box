'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';

import { PATHS } from '@/routes/paths';

export default function PortfolioCommand() {
    const router = useRouter();

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
        >
            <Box>
                <Typography variant="h4">Portfolio Command</Typography>
                <Typography variant="body2" color="text.secondary">
                    Overview of your portfolio, strategies and market activity.
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    onClick={() => router.push(PATHS.dashboard.withdraw)}
                >
                    Withdraw
                </Button>
                <Button
                    variant="contained"
                    onClick={() => router.push(PATHS.dashboard.deposit)}
                >
                    Deposit
                </Button>
            </Stack>
        </Stack>
    );
}