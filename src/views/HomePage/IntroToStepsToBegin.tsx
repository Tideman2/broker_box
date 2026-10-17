'use client';

import { Typography, Stack, Box } from "@mui/material";
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import ContentWrapper from "@/layout/components/ContentWrapper"
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

import IntroToStepIconText from "./components/IntroToStepIconText"

const HOW_IT_WORKS_ANCHOR = 'how-it-works';

const IntroToStepImgAndTexts = [
    {
        icon: TravelExploreOutlinedIcon,
        title: "Explore available traders and their plans",
        description: "Browse the plans traders have published and narrow them down by the approach you are comfortable with."
    },
    {
        icon: FactCheckOutlinedIcon,
        title: "Review the strategy, duration, fees, risks, and profit-sharing terms",
        description: "Each plan sets out its own terms before you commit, so you can read how it operates and how profits are shared."
    },
    {
        icon: ShowChartOutlinedIcon,
        title: "Subscribe and monitor the plan's performance",
        description: "Allocate funds to a plan you have chosen and follow how it performs alongside the rest of your portfolio."
    },
    {
        icon: AccountBalanceWalletOutlinedIcon,
        title: "Review the settlement of eligible funds and realized profits",
        description: "When a plan reaches the end of its term, the eligible funds and realized profits are settled according to that plan's terms."
    }
]

export default function IntroToStepsToBegin() {

    return (
        <Box
            id={HOW_IT_WORKS_ANCHOR}
            component="section"
            aria-label="How it works"
            sx={{ scrollMarginTop: 10 }}
        >
            <ContentWrapper sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                py: { xs: 6, md: 10 },
            }}>
                <SectionHeading
                    eyebrow="How it works"
                    title="From discovery to settlement, in four steps."
                    description="Trader-managed plans follow the same lifecycle every time, so you always know what comes next."
                />

                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                    gap={3}
                    alignItems="stretch"
                >
                    {
                        IntroToStepImgAndTexts.map((step, index) => {
                            return (
                                <Reveal key={step.title} delay={index * 90}>
                                    <IntroToStepIconText
                                        icon={step.icon}
                                        title={step.title}
                                        description={step.description}
                                        step={`Step ${index + 1}`}
                                    />
                                </Reveal>
                            )
                        })
                    }
                </Box>

                <Stack>
                    <Typography variant="caption" color="text.secondary">
                        Step descriptions describe how the plan lifecycle works in general. Each plan
                        publishes its own terms, which govern that specific plan.
                    </Typography>
                </Stack>
            </ContentWrapper>
        </Box>
    )
}
