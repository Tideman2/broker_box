"use client";

import { useState, type FormEvent } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DashboardCard from "@/components/DashboardCard";
import { getProfile, updateProfile } from "@/app/actions/settings-actions";
import { settingsQueryKeys } from "@/api/react-query-keys";
import { useAuthSession } from "@/contexts/authSession/hooks";
import { formatInitials } from "@/utils/format";

const FULL_NAME_MAX = 120;

const fullNameError = (value: string): string | undefined => {
    const name = value.trim();
    if (!name) return "Full name is required";
    if (name.length > FULL_NAME_MAX) {
        return `Full name must be ${FULL_NAME_MAX} characters or fewer`;
    }
    return undefined;
};

/**
 * Profile is read through its own query rather than the auth session, because
 * this card has to surface read failures as an error and has to refresh the
 * moment a save lands.
 */
export default function ProfileCard() {
    const queryClient = useQueryClient();
    const { checkUserSession } = useAuthSession();

    const profileQuery = useQuery({
        queryKey: settingsQueryKeys.profile,
        queryFn: getProfile,
        refetchOnWindowFocus: false,
    });

    const [fullName, setFullName] = useState("");
    const [nameError, setNameError] = useState<string | undefined>();
    const [saveError, setSaveError] = useState<string | undefined>();

    const profile = profileQuery.data;

    const saveMutation = useMutation({
        mutationFn: (name: string) => updateProfile({ full_name: name }),
        onSuccess: (result) => {
            if (!result.success) {
                setSaveError(result.error);
                return;
            }

            setSaveError(undefined);
            queryClient.setQueryData(settingsQueryKeys.profile, result.data);
            // The navbar reads the name from the session, so it has to be
            // refreshed too — otherwise the two disagree until the next reload.
            void checkUserSession();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const error = fullNameError(fullName);
        setNameError(error);
        if (error) return;

        saveMutation.mutate(fullName.trim());
    };

    if (profileQuery.isPending) {
        return (
            <DashboardCard title="Profile" icon={PersonOutlineIcon}>
                <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                    <Typography variant="body2" color="text.secondary">
                        Loading your profile…
                    </Typography>
                </Stack>
            </DashboardCard>
        );
    }

    if (profileQuery.isError || !profile) {
        return (
            <DashboardCard title="Profile" icon={PersonOutlineIcon}>
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={() => profileQuery.refetch()}>
                            Retry
                        </Button>
                    }
                >
                    Your profile could not be loaded. Check your connection and sign in again.
                </Alert>
            </DashboardCard>
        );
    }

    const initials = formatInitials(profile.full_name || profile.email) || "?";

    return (
        <DashboardCard
            title="Profile"
            icon={PersonOutlineIcon}
            action={
                <Typography variant="caption" color="text.secondary">
                    {profile.email}
                </Typography>
            }
        >
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                    <Stack alignItems="center" spacing={1} sx={{ minWidth: 140 }}>
                        <Avatar sx={{ width: 72, height: 72, fontWeight: 800, bgcolor: "primary.main" }}>
                            {initials}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                            Your initials
                        </Typography>
                    </Stack>

                    <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
                        {saveError && <Alert severity="error">{saveError}</Alert>}

                        <TextField
                            label="Full name"
                            value={fullName}
                            onChange={(event) => {
                                setFullName(event.target.value);
                                if (nameError) setNameError(undefined);
                            }}
                            error={Boolean(nameError)}
                            helperText={nameError}
                            fullWidth
                            required
                            autoComplete="name"
                            inputProps={{ maxLength: FULL_NAME_MAX }}
                        />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Email address"
                                    value={profile.email}
                                    fullWidth
                                    disabled
                                    autoComplete="email"
                                    helperText="Contact support to change your email."
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Phone number"
                                    value={profile.phone}
                                    fullWidth
                                    disabled
                                    autoComplete="tel"
                                    helperText="Set during registration."
                                />
                            </Grid>
                        </Grid>

                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={
                                    saveMutation.isPending ? (
                                        <CircularProgress size={16} color="inherit" />
                                    ) : (
                                        <SaveOutlinedIcon />
                                    )
                                }
                                disabled={saveMutation.isPending}
                                sx={{ borderRadius: 2, fontWeight: 700 }}
                            >
                                Save profile
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </DashboardCard>
    );
}
