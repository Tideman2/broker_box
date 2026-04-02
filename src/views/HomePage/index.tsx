"use client"
import { Box } from "@mui/material";

import CtaSection from "./CtaSection";
import TradingSkillsSection from "./TradingSkillsSection";

export default function HomePage() {
    return (
        <Box>
            <CtaSection />
            <TradingSkillsSection />
        </Box>
    );
}