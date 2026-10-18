'use client';

import { Box, Card, CardContent, Stack, Typography, Chip } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import ContentWrapper from '@/layout/components/ContentWrapper';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const BENEFIT_GROUPS = [
    {
        icon: PersonOutlineOutlinedIcon,
        label: 'For investors',
        title: 'Structured exposure without running the strategy yourself',
        points: [
            'Choose from plans published by traders, each with its own stated approach.',
            'Read the duration, minimum investment and profit-sharing terms before you commit.',
            'Track subscription performance alongside the rest of your portfolio.',
            'Keep deposits, withdrawals and trade history in one account.',
        ],
    },
    {
        icon: AccountBalanceOutlinedIcon,
        label: 'For traders',
        title: 'Publish a strategy and reach investors looking for one',
        points: [
            'Describe your approach, risk limits and intended duration in your own words.',
            'Set the profit-sharing terms that govern how you are compensated.',
            'Manage the trading activity for your subscribers from one place.',
            'Build a track record that investors can review over time.',
        ],
    },
];

/**
 * Benefits section. Reframed from the old "trading tools" pitch to describe
 * what each side of the platform actually gets.
 */
export default function TradingSkillsSection() {
    return (
        <Box component="section" aria-label="Benefits" sx={{ bgcolor: 'background.paper' }}>
            <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                <Stack spacing={5}>
                    <SectionHeading
                        eyebrow="Benefits"
                        title="Two sides, one platform"
                        description="Investors get structured access to trader-managed strategies. Traders get a way to publish those strategies and be compensated for them."
                    />

                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }}
                        gap={3}
                        alignItems="stretch"
                    >
                        {BENEFIT_GROUPS.map((group, index) => (
                            <Reveal key={group.label} delay={index * 90}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                                        <Stack spacing={3}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        borderRadius: 3,
                                                        display: 'grid',
                                                        placeItems: 'center',
                                                        color: 'primary.main',
                                                        bgcolor: 'action.hover',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                    <group.icon fontSize="small" />
                                                </Box>
                                                <Chip
                                                    label={group.label}
                                                    color="info"
                                                    size="small"
                                                    sx={{ borderRadius: 999 }}
                                                />
                                            </Stack>

                                            <Typography variant="h5" sx={{ textWrap: 'balance' }}>
                                                {group.title}
                                            </Typography>

                                            <Stack spacing={2}>
                                                {group.points.map((point) => (
                                                    <Stack key={point} direction="row" spacing={1.5} alignItems="flex-start">
                                                        <Typography
                                                            component="span"
                                                            sx={{ color: 'primary.main', lineHeight: 1.7 }}
                                                        >
                                                            &mdash;
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                            {point}
                                                        </Typography>
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        ))}
                    </Box>
                </Stack>
            </ContentWrapper>
        </Box>
    );
}
