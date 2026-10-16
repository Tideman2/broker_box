'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import ContentWrapper from '@/layout/components/ContentWrapper';
import { PATHS } from '@/routes/paths';

export default function FinalCTASection() {
    const router = useRouter();

    return (
        <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
            <Box
                sx={{
                    position: 'relative',
                    py: { xs: 8, md: 12 },
                    px: 3,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 4,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    backgroundImage:
                        'radial-gradient(600px 300px at 50% 0%, rgba(0,214,255,0.12), transparent 70%)',
                }}
            >
                {/* Content */}
                <Stack
                    spacing={3}
                    alignItems="center"
                    textAlign="center"
                    sx={{ position: 'relative', zIndex: 1, maxWidth: 640 }}
                >
                    <Chip
                        label="Get started today"
                        color="info"
                        size="small"
                        sx={{ borderRadius: 999 }}
                    />
                    <Typography variant="h2" sx={{ textWrap: 'balance' }}>
                        Join a new generation of investors
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Open an account in minutes, fund it, and place your first trade.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => router.push(PATHS.auth.register)}
                        >
                            Get Started
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            color="inherit"
                            onClick={() => router.push(PATHS.auth.login)}
                        >
                            Log in
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </ContentWrapper>
    );
}
