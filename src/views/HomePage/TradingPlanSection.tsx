'use client'

import { Typography, Stack, Box } from "@mui/material"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ContentWrapper from "@/layout/components/ContentWrapper"
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const TRUST_POINTS = [
    {
        icon: DescriptionOutlinedIcon,
        title: "Clear plan terms",
        description: "Every plan states its own strategy, duration, minimum investment, risk approach and profit-sharing terms. You read them before you subscribe, not after."
    },
    {
        icon: PercentOutlinedIcon,
        title: "Understandable profit sharing",
        description: "Traders are compensated through the profit-sharing terms set out on the plan you subscribe to. Those terms are part of what you review up front."
    },
    {
        icon: ReceiptLongOutlinedIcon,
        title: "Accessible records",
        description: "Your deposit and withdrawal history, trades and subscription details are kept together in your account so you can review what has happened."
    },
    {
        icon: InfoOutlinedIcon,
        title: "Risk, stated plainly",
        description: "Trading plans carry risk, including the possible loss of capital. Outcomes vary between plans and past performance is not a reliable indicator of future results."
    },
]

/**
 * Trust & transparency section. Replaces the previous fabricated tier cards
 * ("Starter" / "Pro" / "Exclusive") with the terms-based commitments the
 * platform can actually make.
 */
export function TradingPlanSection() {

    return (
        <Box component="section" aria-label="Trust and transparency">
            <ContentWrapper sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                py: { xs: 6, md: 10 },
            }}>
                <SectionHeading
                    eyebrow="Trust & transparency"
                    title="Understand the terms before you commit"
                    description="A plan is only useful to you if you can see what it does, what it costs, and what it does not promise."
                />

                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    gap={3}
                    alignItems="stretch"
                >
                    {
                        TRUST_POINTS.map((point, index) => {
                            return (
                                <Reveal key={point.title} delay={index * 90}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            p: 3,
                                            borderRadius: 4,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            bgcolor: 'background.paper',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                            transition: 'border-color 0.2s ease, transform 0.2s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
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
                                            <point.icon fontSize="small" />
                                        </Box>

                                        <Typography variant="h6" sx={{ textWrap: 'balance' }}>
                                            {point.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {point.description}
                                        </Typography>
                                    </Box>
                                </Reveal>
                            )
                        })
                    }
                </Box>

                <Stack>
                    <Typography variant="caption" color="text.secondary">
                        Nothing on this page is investment advice or a recommendation of any
                        particular plan or trader.
                    </Typography>
                </Stack>
            </ContentWrapper>
        </Box>
    )
}
