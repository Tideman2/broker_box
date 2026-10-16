'use client'

import { Typography, Stack, Box, Chip } from "@mui/material"

import ContentWrapper from "@/layout/components/ContentWrapper"

import TradingPlanCard from "../components/TradingPlanCard"

const Tradingplan = [
    {
        title: "Starter",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") },
        recommended: false,
    },
    {
        title: "Pro",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") },
        recommended: true,
    },
    {
        title: "Exclusive",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") },
        recommended: false,
    },
]


export const TradingPlanSection = () => {

    return (
        <ContentWrapper sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: { xs: 6, md: 10 },
        }}>
            <Stack justifyContent={"center"} spacing={2} alignItems={"center"}>
                <Chip
                    label="Investment plans"
                    color="info"
                    size="small"
                    sx={{ borderRadius: 999 }}
                />
                <Typography variant="h2" textAlign={"center"} sx={{ textWrap: 'balance' }}>
                    Our best minimum investment plans
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 560 }}>
                    Pick the tier that fits how you trade. Upgrade or cancel anytime.
                </Typography>
            </Stack>

            <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={3}
                alignItems="stretch"
            >
                {
                    Tradingplan.map((plan, indx) => {
                        return (
                            <TradingPlanCard
                                key={indx}
                                title={plan.title}
                                features={plan.feat}
                                onClick={plan.onBtnClick}
                                buttonText={plan.btnText}
                                recommended={plan.recommended} />
                        )
                    })
                }
            </Box>
        </ContentWrapper>
    )
}
