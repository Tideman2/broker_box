'use client'

import { Typography, Stack, Box } from "@mui/material"
import Handshake from "@mui/icons-material/Handshake"

import ContentWrapper from "@/layout/components/ContentWrapper"

import TradingPlanCard from "../components/TradingPlanCard"

const Tradingplan = [
    {
        title: "Starter",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") }
    },
    {
        title: "Pro",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") }
    },
    {
        title: "Exclusive",
        feat: ["Great features", "Live api", "Crypto", "Advance tools"],
        btnText: "Choose plan",
        onBtnClick: () => { console.log("clicked") }
    },
]


export const TradingPlanSection = () => {

    return (
        <ContentWrapper sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
        }}>
            <Stack justifyContent={"center"} spacing={1} alignItems={"center"}>
                <Stack direction={"row"}
                    bgcolor={"info.main"}
                    width={"fit-content"}
                    color="info.contrastText"
                    padding={1}
                    borderRadius={2}
                    spacing={1}>
                    <Handshake />
                    <Typography variant="body2">
                        Minimum Investment plan
                    </Typography>
                </Stack>
                <Typography variant="h2" textAlign={"center"}>
                    Our Best Minimum
                </Typography>
                <Typography variant="h2" color="info" textAlign={"center"}>
                    Investment Plan
                </Typography>
            </Stack>

            <Box display={"flex"} gap={2} justifyContent={"space-around"} flexWrap={"wrap"}>
                {
                    Tradingplan.map((plan) => {
                        return (
                            <TradingPlanCard
                                title={plan.title}
                                features={plan.feat}
                                onClick={plan.onBtnClick}
                                buttonText={plan.btnText} />
                        )
                    })
                }
            </Box>
        </ContentWrapper>
    )
}