"use client"
import { Box } from "@mui/material";

import CtaSection from "./CtaSection";
import IntroToStepsToBegin from "./IntroToStepsToBegin";
import TradingSkillsSection from "./TradingSkillsSection";
import { TradingPlanSection } from "./TradingPlanSection";
import FinalCTASection from "./FinalCtaSection";

export default function HomePage() {
    return (
        <Box>
            {/* Hero — headline, value proposition, primary CTA */}
            <CtaSection />

            {/* How it works — the four-step investor journey */}
            <IntroToStepsToBegin />

            {/* Benefits — what investors and traders each get */}
            <TradingSkillsSection />

            {/* Trust & transparency — terms, profit sharing, records, risk */}
            <TradingPlanSection />

            {/* Closing CTA */}
            <FinalCTASection />
        </Box>
    );
}
