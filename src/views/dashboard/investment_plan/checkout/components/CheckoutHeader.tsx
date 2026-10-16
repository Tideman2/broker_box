"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

import { PATHS } from "@/routes/paths";

import {
    BACK_LABEL,
    CHECKOUT_DESCRIPTION,
    CHECKOUT_TITLE,
} from "../mockContent";

export default function CheckoutHeader() {
    const router = useRouter();

    return (
        <Stack spacing={1.5}>
            <Button
                onClick={() => router.push(PATHS.dashboard.investmentplans)}
                startIcon={<ArrowBackIcon />}
                sx={{
                    alignSelf: "flex-start",
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    color: "text.secondary",
                    fontWeight: 600,
                    "&:hover": { color: "primary.main" },
                }}
            >
                {BACK_LABEL}
            </Button>

            <Box>
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: "0.14em", fontWeight: 700 }}
                    color="primary.main"
                >
                    Step 2 of 2 · Confirm
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
                    {CHECKOUT_TITLE}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {CHECKOUT_DESCRIPTION}
                </Typography>
            </Box>
        </Stack>
    );
}
