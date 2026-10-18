'use client';

import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { useRouter } from 'next/navigation';

import ContentWrapper from '@/layout/components/ContentWrapper';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { PATHS } from '@/routes/paths';

import AboutCard from './components/AboutCard';

const PROBLEMS = [
    {
        icon: ErrorOutlineOutlinedIcon,
        title: 'Strategies are hard to evaluate on their own',
        body: 'A track record on its own does not tell you how a strategy is managed, what it is willing to risk, or how the trader is compensated for running it.',
    },
    {
        icon: HistoryOutlinedIcon,
        title: 'Terms are usually discussed after the fact',
        body: 'Duration, minimums and profit-sharing tend to surface late, which makes it difficult to compare options before committing to one.',
    },
    {
        icon: GppMaybeOutlinedIcon,
        title: 'Risk is easy to gloss over',
        body: 'Performance figures travel well; the possibility of loss does not. Investors need both presented together rather than separately.',
    },
];

const APPROACH = [
    {
        icon: AccountTreeOutlinedIcon,
        title: 'Plans are published by traders',
        body: 'Each plan sets out its own strategy, duration, minimum investment, risk approach and profit-sharing terms as a single published record.',
    },
    {
        icon: BalanceOutlinedIcon,
        title: 'Terms are read before subscribing',
        body: 'Those terms are shown as part of the plan itself, so an investor reviews what a plan does and how it is compensated before allocating funds.',
    },
    {
        icon: VisibilityOutlinedIcon,
        title: 'Performance is followed in one place',
        body: 'Subscriptions, portfolio value and account records sit together in the same account, so there is one place to look rather than several.',
    },
];

const PRINCIPLES = [
    {
        icon: VisibilityOutlinedIcon,
        title: 'Clarity over persuasion',
        body: 'Plans are described in plain terms. We would rather a visitor understands a plan and walks away than misunderstands it and subscribes.',
    },
    {
        icon: BalanceOutlinedIcon,
        title: 'Terms before commitment',
        body: 'What a plan does, what it costs, and how profits are shared are part of what you review before you allocate funds, not after.',
    },
    {
        icon: GppMaybeOutlinedIcon,
        title: 'Risk stated plainly',
        body: 'Trading carries risk, including the possible loss of capital. We do not present outcomes as predictable or results as assured.',
    },
    {
        icon: HistoryOutlinedIcon,
        title: 'Records you can revisit',
        body: 'Deposits, withdrawals, trades and subscriptions are kept together, so what happened is something you can check rather than recall.',
    },
];

const WHO_WE_SERVE = [
    {
        label: 'For investors',
        title: 'You want exposure to a strategy without running it yourself',
        body: 'You are looking for a way to review trader-managed plans on their stated terms, choose the ones that fit what you are comfortable with, and follow them alongside the rest of your portfolio.',
    },
    {
        label: 'For traders',
        title: 'You run a strategy and want to publish it openly',
        body: 'You want to set out how you trade, the limits you work within, and the terms you are compensated on — and have that visible to investors reviewing plans.',
    },
];

/** About page. Explains the investor/trader model, the problem it addresses, and the platform's principles. */
export default function AboutPage() {
    const router = useRouter();

    return (
        <Box>
            {/* Hero */}
            <Box
                component="section"
                aria-labelledby="about-heading"
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundImage: [
                        'radial-gradient(900px 520px at 12% -10%, rgba(0, 214, 255, 0.18), transparent 62%)',
                        'radial-gradient(760px 460px at 88% 8%, rgba(140, 92, 255, 0.18), transparent 64%)',
                        'linear-gradient(to right, rgba(127, 127, 127, 0.07) 1px, transparent 1px)',
                        'linear-gradient(to bottom, rgba(127, 127, 127, 0.07) 1px, transparent 1px)',
                    ].join(', '),
                    backgroundSize: 'auto, auto, 72px 72px, 72px 72px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top',
                }}
            >
                <ContentWrapper sx={{ py: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 } }}>
                    <Stack spacing={3} sx={{ maxWidth: 820 }}>
                        <Chip
                            label="About"
                            color="info"
                            size="small"
                            sx={{ borderRadius: 999, width: 'fit-content' }}
                        />
                        <Typography
                            id="about-heading"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(2rem, 5.5vw, 4.25rem)',
                                lineHeight: 1.08,
                                letterSpacing: '-0.02em',
                                textWrap: 'balance',
                            }}
                        >
                            Bringing Traders and Investors Together.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
                            Merchant Box is a platform where traders publish strategies as
                            investment plans, and investors review those plans and follow the
                            ones they subscribe to. This page explains what that means in
                            practice.
                        </Typography>
                    </Stack>
                </ContentWrapper>
            </Box>

            {/* Mission */}
            <Box component="section" aria-label="Mission" sx={{ bgcolor: 'background.paper' }}>
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Reveal>
                        <Stack
                            spacing={3}
                            sx={{
                                maxWidth: 860,
                                mx: 'auto',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Chip
                                label="Our mission"
                                color="info"
                                size="small"
                                sx={{ borderRadius: 999 }}
                            />
                            <Typography
                                variant="h3"
                                sx={{ textWrap: 'balance', fontWeight: 600 }}
                            >
                                Make trader-managed investing legible to the people funding it.
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Investing alongside someone else&apos;s strategy only makes sense
                                if you can see how that strategy operates, what it is willing to
                                risk, how it is compensated, and what has happened since. Our
                                mission is to keep those four things visible — on the plan, in the
                                dashboard, and in the records you can revisit afterwards.
                            </Typography>
                        </Stack>
                    </Reveal>
                </ContentWrapper>
            </Box>

            {/* Problem */}
            <Box component="section" aria-label="The problem we address">
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={5}>
                        <SectionHeading
                            eyebrow="The problem"
                            title="Following a strategy usually means taking it on trust"
                            description="Most of what an investor needs to know arrives either too late or stripped of the context that gives it meaning."
                        />

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
                            gap={3}
                            alignItems="stretch"
                        >
                            {PROBLEMS.map((item, index) => (
                                <Reveal key={item.title} delay={index * 90}>
                                    <AboutCard icon={item.icon} title={item.title} body={item.body} />
                                </Reveal>
                            ))}
                        </Box>
                    </Stack>
                </ContentWrapper>
            </Box>

            {/* Approach */}
            <Box component="section" aria-label="Our approach" sx={{ bgcolor: 'background.paper' }}>
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={5}>
                        <SectionHeading
                            eyebrow="Our approach"
                            title="Terms belong on the plan, not in a follow-up conversation"
                            description="A plan is a published record. It carries its own terms, and those terms are what an investor reviews before subscribing."
                        />

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
                            gap={3}
                            alignItems="stretch"
                        >
                            {APPROACH.map((item, index) => (
                                <Reveal key={item.title} delay={index * 90}>
                                    <AboutCard icon={item.icon} title={item.title} body={item.body} />
                                </Reveal>
                            ))}
                        </Box>
                    </Stack>
                </ContentWrapper>
            </Box>

            {/* Who we serve */}
            <Box component="section" aria-label="Who we serve">
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={5}>
                        <SectionHeading
                            eyebrow="Who we serve"
                            title="Two sides, meeting at the plan"
                            description="The platform only works if both sides can see enough to decide. Each side is here for a different reason, and the plan is what they share."
                        />

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }}
                            gap={3}
                            alignItems="stretch"
                        >
                            {WHO_WE_SERVE.map((item, index) => (
                                <Reveal key={item.label} delay={index * 90}>
                                    <CardShell label={item.label} title={item.title} body={item.body} />
                                </Reveal>
                            ))}
                        </Box>
                    </Stack>
                </ContentWrapper>
            </Box>

            {/* Principles */}
            <Box component="section" aria-label="Our principles" sx={{ bgcolor: 'background.paper' }}>
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={5}>
                        <SectionHeading
                            eyebrow="Our principles"
                            title="What we hold to"
                            description="Four commitments that shape how plans are written, presented, and remembered."
                        />

                        <Box
                            display="grid"
                            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                            gap={3}
                            alignItems="stretch"
                        >
                            {PRINCIPLES.map((item, index) => (
                                <Reveal key={item.title} delay={index * 90}>
                                    <AboutCard icon={item.icon} title={item.title} body={item.body} />
                                </Reveal>
                            ))}
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                            Nothing on this page is investment advice or a recommendation of any
                            particular plan or trader. Trading involves risk, including the
                            possible loss of capital, and past performance is not a reliable
                            indicator of future results.
                        </Typography>
                    </Stack>
                </ContentWrapper>
            </Box>

            {/* Closing CTA */}
            <Box component="section" aria-label="Get started">
                <ContentWrapper sx={{ py: { xs: 6, md: 10 } }}>
                    <Reveal>
                        <Stack spacing={3} sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', alignItems: 'center' }}>
                            <Chip label="Get started" color="info" size="small" sx={{ borderRadius: 999 }} />
                            <Typography variant="h3" sx={{ textWrap: 'balance' }}>
                                Read the plans and decide for yourself
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Create an account to browse available plans, review their terms,
                                and track your subscriptions from one dashboard.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => router.push(PATHS.auth.register)}
                                >
                                    Create an account
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
                    </Reveal>
                </ContentWrapper>
            </Box>
        </Box>
    );
}

/** Wider audience card with an eyebrow label above the title. */
function CardShell({
    label,
    title,
    body,
}: {
    label: string;
    title: string;
    body: string;
}) {
    return (
        <Box
            sx={{
                height: '100%',
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Chip label={label} color="info" size="small" sx={{ borderRadius: 999, width: 'fit-content' }} />
            <Typography variant="h5" sx={{ textWrap: 'balance' }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {body}
            </Typography>
        </Box>
    );
}
