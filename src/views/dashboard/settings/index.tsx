"use client";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import ContentWrapper from "@/layout/components/ContentWrapper";
import DashboardCard from "@/components/DashboardCard";
import DashboardFooter from "../board/components/DashboardFooter";

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
                        Manage your profile, security, and notification preferences.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Stack spacing={3}>
                            <DashboardCard
                                title="Profile"
                                icon={PersonOutlineIcon}
                                action={
                                    <Chip
                                        size="small"
                                        label="Verified"
                                        color="success"
                                        variant="outlined"
                                        sx={{ fontWeight: 700 }}
                                    />
                                }
                            >
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                                    <Stack alignItems="center" spacing={1.5} sx={{ minWidth: 140 }}>
                                        <Avatar sx={{ width: 72, height: 72, fontWeight: 800 }}>
                                            JD
                                        </Avatar>
                                        <Button size="small" variant="outlined" sx={{ borderRadius: 2, fontWeight: 600 }}>
                                            Change photo
                                        </Button>
                                    </Stack>
                                    <Stack spacing={2} sx={{ flex: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="First name"
                                                    defaultValue="Jane"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    label="Last name"
                                                    defaultValue="Doe"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <TextField
                                            label="Email address"
                                            defaultValue="jane.doe@example.com"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Phone number"
                                            defaultValue="+1 (555) 000-1234"
                                            fullWidth
                                        />
                                        <Box>
                                            <Button
                                                variant="contained"
                                                startIcon={<SaveOutlinedIcon />}
                                                sx={{ borderRadius: 2, fontWeight: 700 }}
                                            >
                                                Save profile
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </DashboardCard>

                            <DashboardCard title="Security" icon={SecurityOutlinedIcon}>
                                <Stack spacing={2.5}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                label="Current password"
                                                type="password"
                                                placeholder="••••••••"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                label="New password"
                                                type="password"
                                                placeholder="••••••••"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ borderColor: "divider" }} />
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        spacing={1.5}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                Two-factor authentication
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Add an extra layer of protection to your account.
                                            </Typography>
                                        </Box>
                                        <FormControlLabel
                                            control={<Switch defaultChecked />}
                                            label="Enabled"
                                            sx={{ m: 0 }}
                                        />
                                    </Stack>
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            sx={{ borderRadius: 2, fontWeight: 600 }}
                                        >
                                            Update password
                                        </Button>
                                    </Box>
                                </Stack>
                            </DashboardCard>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Stack spacing={3}>
                            <DashboardCard
                                title="Preferences"
                                icon={TuneOutlinedIcon}
                                sx={{ position: { lg: "sticky" }, top: { lg: 88 } }}
                            >
                                <Stack spacing={2}>
                                    <TextField
                                        select
                                        label="Theme"
                                        defaultValue="system"
                                        fullWidth
                                    >
                                        <MenuItem value="light">Light</MenuItem>
                                        <MenuItem value="dark">Dark</MenuItem>
                                        <MenuItem value="system">System default</MenuItem>
                                    </TextField>
                                    <TextField
                                        select
                                        label="Currency display"
                                        defaultValue="usd"
                                        fullWidth
                                    >
                                        <MenuItem value="usd">USD — US Dollar</MenuItem>
                                        <MenuItem value="eur">EUR — Euro</MenuItem>
                                        <MenuItem value="gbp">GBP — British Pound</MenuItem>
                                    </TextField>
                                    <Divider sx={{ borderColor: "divider" }} />
                                    <Stack spacing={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}
                                        >
                                            <NotificationsOutlinedIcon sx={{ fontSize: 18 }} />
                                            Notifications
                                        </Typography>
                                        <FormControlLabel
                                            control={<Switch defaultChecked />}
                                            label="Deposit & withdrawal alerts"
                                        />
                                        <FormControlLabel
                                            control={<Switch defaultChecked />}
                                            label="Plan & earnings updates"
                                        />
                                        <FormControlLabel
                                            control={<Switch />}
                                            label="Marketing emails"
                                        />
                                    </Stack>
                                </Stack>
                            </DashboardCard>
                        </Stack>
                    </Grid>
                </Grid>

                <DashboardFooter />
            </Stack>
        </ContentWrapper>
    );
}
