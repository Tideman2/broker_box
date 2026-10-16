'use client'

import { Typography, Stack, Box, Chip } from "@mui/material"

import { tradehand, spindollar, bookmark } from "@/components/exports"
import ContentWrapper from "@/layout/components/ContentWrapper"

import IntroToStepIconText from "./components/IntroToStepIconText"

const IntroToStepImgAndTexts = [
    {
        img: bookmark.src,
        title: "Open an account",
        description: "Our user-friendly registration process ensures that you can open your trading account quickly and hassle-free."
    },
    {
        img: tradehand.src,
        title: "Deposit amount",
        description: "Your deposit amount is the foundation of your trading endeavors. It's the fuel that powers your trades and positions you for potential profits."
    },
    {
        img: spindollar.src,
        title: "Start trading",
        description: "Our intuitive and user-friendly trading platform is designed with you in mind. Seamlessly navigate the markets, execute trades, and monitor your progress effortlessly."
    }
]

export const IntroToStepsToBegin = () => {

    return (
        <ContentWrapper sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: { xs: 6, md: 10 },
        }}>
            <Stack justifyContent={"center"} spacing={2} alignItems={"center"}>
                <Chip
                    label="How it works"
                    color="info"
                    size="small"
                    sx={{ borderRadius: 999 }}
                />
                <Typography variant="h2" textAlign={"center"} sx={{ textWrap: 'balance' }}>
                    Start trading with Merchant Box
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 560 }}>
                    Three simple steps to go from signup to your first trade.
                </Typography>
            </Stack>
            <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
                gap={3}
                alignItems="stretch"
            >
                {
                    IntroToStepImgAndTexts.map((step, index) => {
                        return (
                            <IntroToStepIconText
                                key={index}
                                image={step.img}
                                title={step.title}
                                description={step.description}
                                step={`Step ${index + 1}`}
                            />
                        )
                    })
                }
            </Box>
        </ContentWrapper>
    )
}
