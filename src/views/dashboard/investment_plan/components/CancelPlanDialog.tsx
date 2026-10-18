"use client";

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
    CANCEL_CONFIRM_LABEL,
    CANCEL_DESCRIPTION,
    CANCEL_FOOTER_NOTE,
    CANCEL_TITLE,
    CANCELLING_LABEL,
    KEEP_PLAN_LABEL,
} from "../mockContent";

type CancelPlanDialogProps = {
    open: boolean;
    planTitle?: string;
    cancelling?: boolean;
    error?: string;
    onKeep: () => void;
    onConfirm: () => void;
};

export default function CancelPlanDialog({
    open,
    planTitle,
    cancelling,
    error,
    onKeep,
    onConfirm,
}: CancelPlanDialogProps) {
    return (
        <Dialog open={open} onClose={cancelling ? undefined : onKeep} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ pb: 0.5 }}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.error.main, 0.1),
                            flexShrink: 0,
                        }}
                    >
                        <WarningAmberIcon sx={{ color: "error.main" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {CANCEL_TITLE}
                    </Typography>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
                <Stack spacing={1.5} sx={{ pt: 0.5 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {CANCEL_DESCRIPTION.replace("{title}", planTitle ?? "")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {CANCEL_FOOTER_NOTE}
                    </Typography>
                    {error && (
                        <Alert severity="error" variant="outlined">
                            {error}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, flexWrap: "wrap", rowGap: 1 }}>
                <Button
                    onClick={onKeep}
                    variant="outlined"
                    disabled={cancelling}
                    fullWidth
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    {KEEP_PLAN_LABEL}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={cancelling}
                    fullWidth
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                    {cancelling ? CANCELLING_LABEL : CANCEL_CONFIRM_LABEL}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
