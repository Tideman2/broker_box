'use client'

import { Typography, Stack } from "@mui/material"
import Handshake from "@mui/icons-material/Handshake"

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
        description: "Your deposit amount is the foundation of your trading endeavors. it's the fuel that powers your trades and positions you for potential profits."
    },
    {
        img: spindollar.src,
        title: "Start trading",
        description: "Our intuitive and user-friendly trading platform is designed with you in mind. seamlessly navigate the markets, execute trades, and monitor your progress effortlessly."
    }
]

export const IntroToStepsToBegin = () => {

    return (
        <ContentWrapper sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
        }}>
            <Stack justifyContent={"center"} spacing={2} alignItems={"center"}>
                <Stack direction={"row"}
                    bgcolor={"info.main"}
                    width={"fit-content"}
                    color="info.contrastText"
                    padding={1}
                    borderRadius={2}
                    spacing={1}>
                    <Handshake />
                    <Typography variant="body2">
                        How it works
                    </Typography>
                </Stack>
                <Typography variant="h2" textAlign={"center"}>
                    Start Trading <span>With</span> <br />
                    <span>Merchant Box</span>
                </Typography>
            </Stack>
            <Stack direction={{ sm: "column", md: "row" }}
                height={{ sm: "auto", md: "270px" }}
                spacing={3}>
                {
                    IntroToStepImgAndTexts.map((step) => {
                        return (
                            <IntroToStepIconText image={step.img} title={step.title} description={step.description} />
                        )
                    })
                }
            </Stack>
        </ContentWrapper>
    )
}