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
                sx={{ alignSelf: "flex-start", px: 0, color: "text.secondary" }}
            >
                {BACK_LABEL}
            </Button>

            <Box>
                <Typography variant="h4">{CHECKOUT_TITLE}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {CHECKOUT_DESCRIPTION}
                </Typography>
            </Box>
        </Stack>
    );
}
