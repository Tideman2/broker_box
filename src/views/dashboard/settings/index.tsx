"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";
import DashboardFooter from "../board/components/DashboardFooter";

import ProfileCard from "./components/ProfileCard";
import SecurityCard from "./components/SecurityCard";
import PreferencesCard from "./components/PreferencesCard";

export default function Settings() {
    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <Box>
                    <Typography
                        variant="overline"
                        sx={{ letterSpacing: "0.14em", fontWeight: 700 }}
                        color="primary.main"
                    >
                        Account
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}>
                        Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Manage your profile, security, and display preferences.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Stack spacing={3}>
                            <ProfileCard />
                            <SecurityCard />
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <PreferencesCard />
                    </Grid>
                </Grid>

                <DashboardFooter />
            </Stack>
        </ContentWrapper>
    );
}
