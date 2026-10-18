"use client";

import { useState, type FormEvent } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useMutation } from "@tanstack/react-query";

import DashboardCard from "@/components/DashboardCard";
import { changePassword } from "@/app/actions/settings-actions";
import PasswordChangedDialog from "./PasswordChangedDialog";

import { z } from "zod";

/**
 * The API requires 8-100 characters for `new_password`, which is stricter than
 * the 6 required at registration.
 */
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 100;

const schema = z
    .object({
        current_password: z.string().min(1, "Enter your current password"),
        new_password: z
            .string()
            .min(
                MIN_PASSWORD_LENGTH,
                `New password must be at least ${MIN_PASSWORD_LENGTH} characters`
            )
            .max(
                MAX_PASSWORD_LENGTH,
                `New password must be ${MAX_PASSWORD_LENGTH} characters or fewer`
            ),
        confirm_password: z.string().min(1, "Confirm your new password"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    })
    .refine((data) => data.new_password !== data.current_password, {
        message: "New password must differ from the current one",
        path: ["new_password"],
    });

type FieldErrors = Partial<
    Record<keyof z.infer<typeof schema> | 'form', string>
>;

const fieldErrorsFrom = (issues: z.ZodIssue[]): FieldErrors =>
    Object.fromEntries(
        issues.map((issue) => [issue.path[0] as string, issue.message])
    ) as FieldErrors;

/**
 * The API prefixes `422` details with the offending field
 * (`"new_password: String should have at least 8 characters"`), so that one is
 * attached to the field it names. Anything else — `"Current password is
 * incorrect."`, `"Not authenticated"` — is shown on the whole form, because it
 * is not about one input.
 */
const SERVER_FIELD_PREFIX = /^(current_password|new_password):\s*/;

const serverErrorToField = (message: string): FieldErrors => {
    const match = SERVER_FIELD_PREFIX.exec(message);
    if (match) return { [match[1]]: message.replace(SERVER_FIELD_PREFIX, "") };

    return { form: message };
};

/**
 * Changing the password revokes every session server-side, including this one,
 * so a success is followed by a dialog that explains the sign-out rather than
 * silently leaving a dead token behind.
 */
export default function SecurityCard() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [changed, setChanged] = useState(false);

    const changeMutation = useMutation({
        mutationFn: (payload: { current_password: string; new_password: string }) =>
            changePassword(payload),
        onSuccess: (result) => {
            if (!result.success) {
                setFieldErrors(serverErrorToField(result.error));
                return;
            }

            setChanged(true);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = schema.safeParse({
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        });

        if (!parsed.success) {
            setFieldErrors(fieldErrorsFrom(parsed.error.issues));
            return;
        }

        setFieldErrors({});
        changeMutation.mutate({
            current_password: parsed.data.current_password,
            new_password: parsed.data.new_password,
        });
    };

    return (
        <>
            <DashboardCard title="Security" icon={SecurityOutlinedIcon}>
                <Typography variant="body2" color="text.secondary">
                    Changing your password signs you out of every device, including
                    this one.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={2}>
                        {fieldErrors.form && <Alert severity="error">{fieldErrors.form}</Alert>}

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Current password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    error={Boolean(fieldErrors.current_password)}
                                    helperText={fieldErrors.current_password}
                                    fullWidth
                                    required
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="New password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    error={Boolean(fieldErrors.new_password)}
                                    helperText={fieldErrors.new_password}
                                    fullWidth
                                    required
                                    autoComplete="new-password"
                                    inputProps={{ minLength: MIN_PASSWORD_LENGTH }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Confirm new password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    error={Boolean(fieldErrors.confirm_password)}
                                    helperText={fieldErrors.confirm_password}
                                    fullWidth
                                    required
                                    autoComplete="new-password"
                                    inputProps={{ minLength: MIN_PASSWORD_LENGTH }}
                                />
                            </Grid>
                        </Grid>

                        <Alert severity="info">
                            We never ask for your password and will not send it to
                            anyone. Choose something you do not use elsewhere.
                        </Alert>

                        <Box>
                            <Button
                                type="submit"
                                variant="outlined"
                                disabled={changeMutation.isPending}
                                startIcon={
                                    changeMutation.isPending ? (
                                        <CircularProgress size={16} color="inherit" />
                                    ) : undefined
                                }
                                sx={{ borderRadius: 2, fontWeight: 600 }}
                            >
                                Update password
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </DashboardCard>

            <PasswordChangedDialog open={changed} />
        </>
    );
}
