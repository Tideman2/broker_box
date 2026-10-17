"use client";

import { useRouter } from "next/navigation";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

import { PATHS } from "@/routes/paths";
import { logout } from "@/app/actions/auth-actions";

type PasswordChangedDialogProps = {
    open: boolean;
};

/**
 * Shown after a successful password change. Every session was revoked by the
 * server as part of that change, so leaving this dialog signs the user out —
 * there is nothing left to stay signed in with.
 */
export default function PasswordChangedDialog({ open }: PasswordChangedDialogProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        // The token is already revoked server-side; this only clears the
        // cookies so the client stops presenting a dead session.
        await logout();
        router.replace(PATHS.auth.login);
    };

    return (
        <Dialog
            open={open}
            onClose={handleSignOut}
            disableEscapeKeyDown
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: { sx: { borderRadius: 3, p: 1 } },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontWeight: 800,
                }}
            >
                <LockResetOutlinedIcon color="primary" />
                Password updated
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For your security, changing your password signs you out of
                    every device. Please sign in again with your new password.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    variant="contained"
                    onClick={handleSignOut}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                    Sign in again
                </Button>
            </DialogActions>
        </Dialog>
    );
}
