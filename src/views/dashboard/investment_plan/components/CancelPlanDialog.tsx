"use client";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";

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
        <Dialog open={open} onClose={cancelling ? undefined : onKeep} fullWidth maxWidth="xs">
            <DialogTitle>{CANCEL_TITLE}</DialogTitle>
            <DialogContent>
                <Stack spacing={1.5}>
                    <Typography variant="body2">
                        {CANCEL_DESCRIPTION.replace("{title}", planTitle ?? "")}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {CANCEL_FOOTER_NOTE}
                    </Typography>
                    {error && (
                        <Typography variant="caption" color="error.main">
                            {error}
                        </Typography>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, flexWrap: "wrap", rowGap: 1 }}>
                <Button
                    onClick={onKeep}
                    variant="outlined"
                    disabled={cancelling}
                    fullWidth
                >
                    {KEEP_PLAN_LABEL}
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={cancelling}
                    fullWidth
                >
                    {cancelling ? CANCELLING_LABEL : CANCEL_CONFIRM_LABEL}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
