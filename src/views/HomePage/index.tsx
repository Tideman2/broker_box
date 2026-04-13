"use client"
import { Box } from "@mui/material";

import CtaSection from "./CtaSection";
import TradingSkillsSection from "./TradingSkillsSection";
import { IntroToStepsToBegin } from "./IntroToStepsToBegin";
import { TradingPlanSection } from "./TradingPlanSection";
import FinalCTASection from "./FinalCtaSection";

export default function HomePage() {
    return (
        <Box>
            <CtaSection />
            <TradingSkillsSection />
            <IntroToStepsToBegin />
            <TradingPlanSection />
            <FinalCTASection />
        </Box>
    );
}