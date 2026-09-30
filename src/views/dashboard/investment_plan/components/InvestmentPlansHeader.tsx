"use client";

import { Box, Stack, Typography } from "@mui/material";

import { PAGE_DESCRIPTION, PAGE_TITLE } from "../mockContent";

export default function InvestmentPlansHeader() {
    return (
        <Stack spacing={0.5}>
            <Typography variant="h4">{PAGE_TITLE}</Typography>
            <Box sx={{ maxWidth: 720 }}>
                <Typography variant="body2" color="text.secondary">
                    {PAGE_DESCRIPTION}
                </Typography>
            </Box>
        </Stack>
    );
}
