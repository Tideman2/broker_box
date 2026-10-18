'use client';

import { type MouseEvent } from 'react';
import { Box, Button, Chip, Link, Stack, Typography } from '@mui/material';

import ContentWrapper from '@/layout/components/ContentWrapper';
import { useMediaQuery } from '@/layout/hook/useMediaQueries';
import { PATHS } from '@/routes/paths';
import { GLOBAL_CONFIG } from '@/config/global';

/** Hero backdrop: token-tinted gradients over a faint engineering grid. */
const HERO_SURFACE = {
    backgroundImage: [
        'radial-gradient(900px 520px at 12% -10%, rgba(0, 214, 255, 0.18), transparent 62%)',
        'radial-gradient(760px 460px at 88% 8%, rgba(140, 92, 255, 0.18), transparent 64%)',
        'linear-gradient(to right, rgba(127, 127, 127, 0.07) 1px, transparent 1px)',
        'linear-gradient(to bottom, rgba(127, 127, 127, 0.07) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: 'auto, auto, 72px 72px, 72px 72px',
} as const;

const scrollToSteps = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('how-it-works');
    if (!target) return;

    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

/** Landing hero. Opens the trader-managed plan story and points at the plan feed. */
export default function CtaSection() {
    const isMobile = useMediaQuery('upToSm');

    return (
        <Box
            component="section"
            aria-labelledby="hero-heading"
            sx={{
                ...HERO_SURFACE,
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
            }}
        >
            <ContentWrapper sx={{ py: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 } }}>
                <Stack spacing={3} sx={{ maxWidth: 820 }}>
                    <Chip
                        label="Trader-managed plans"
                        color="info"
                        size="small"
                        sx={{ borderRadius: 999, width: 'fit-content' }}
                    />

                    <Typography
                        id="hero-heading"
                        variant="h1"
                        sx={{
                            fontSize: 'clamp(2rem, 5.5vw, 4.25rem)',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            textWrap: 'balance',
                        }}
                    >
                        Discover Trading Plans. Follow Performance. Stay in Control.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
                        Explore plans published by traders, read each plan&apos;s strategy,
                        duration and profit-sharing terms, then follow how your subscription
                        performs from a single dashboard.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ pt: 1, width: '100%', maxWidth: 460 }}
                    >
                        <Button
                            href={PATHS.auth.login}
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth={isMobile}
                        >
                            Explore Plans
                        </Button>
                        <Button
                            href="#how-it-works"
                            onClick={scrollToSteps}
                            variant="outlined"
                            color="inherit"
                            size="large"
                            fullWidth={isMobile}
                        >
                            How It Works
                        </Button>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                        Already subscribed?{' '}
                        <Link
                            href={PATHS.auth.login}
                            underline="hover"
                            fontWeight={600}
                            color="primary"
                        >
                            Log in
                        </Link>
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ maxWidth: 640, display: 'block', pt: 2 }}
                    >
                        Trading involves risk, including the possible loss of capital. Plan
                        terms, fees and profit-sharing are set by each trader and shown before
                        you subscribe. Past performance is not a reliable indicator of future
                        results. {GLOBAL_CONFIG.site.name} does not guarantee returns or
                        capital preservation.
                    </Typography>
                </Stack>
            </ContentWrapper>
        </Box>
    );
}
