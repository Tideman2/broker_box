"use client";

import { Box, Stack, Typography } from "@mui/material";

import { PAGE_DESCRIPTION, PAGE_TITLE } from "../mockContent";

export default function InvestmentPlansHeader() {
    return (
        <Stack spacing={0.5}>
            <Typography
                variant="overline"
                sx={{ letterSpacing: "0.14em", fontWeight: 700 }}
                color="primary.main"
            >
                Grow your capital
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
                {PAGE_TITLE}
            </Typography>
            <Box sx={{ maxWidth: 720 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                    {PAGE_DESCRIPTION}
                </Typography>
            </Box>
        </Stack>
    );
}
