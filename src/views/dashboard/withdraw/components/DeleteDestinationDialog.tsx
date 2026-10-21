"use client";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteWithdrawDestination } from "@/app/actions/withdraw-actions";
import { withdrawQueryKeys } from "@/api/react-query-keys";

import { destinationSubtitle, extractErrorMessage } from "./utils";

import type { DestinationResponse } from "@/api/withdraw/types";

type DeleteDestinationDialogProps = {
    /** Null closes the dialog. */
    destination: DestinationResponse | null;
    onClose: () => void;
    onDeleted: (id: number) => void;
};

export default function DeleteDestinationDialog({
    destination,
    onClose,
    onDeleted,
}: DeleteDestinationDialogProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteWithdrawDestination(id),
        onSuccess: (result, id) => {
            if (!result.success) {
                if (result.status === 404) {
                    queryClient.invalidateQueries({
                        queryKey: withdrawQueryKeys.destinations,
                    });
                    onDeleted(id);
                    onClose();
                    return;
                }

                // 409: the destination has withdrawal history; keep the row.
                return;
            }

            queryClient.setQueryData<DestinationResponse[]>(
                withdrawQueryKeys.destinations,
                (current) => current?.filter((entry) => entry.id !== id)
            );
            onDeleted(id);
            onClose();
        },
    });

    const error = deleteMutation.isError
        ? extractErrorMessage(deleteMutation.error)
        : deleteMutation.data?.success === false
            ? deleteMutation.data.status === 409
                ? "This destination has withdrawal history and can't be deleted."
                : deleteMutation.data.error
            : "";

    const deleting = deleteMutation.isPending;

    return (
        <Dialog
            open={destination != null}
            onClose={deleting ? undefined : onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
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
                        Delete destination?
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Stack spacing={1.5} sx={{ pt: 0.5 }}>
                    {destination && (
                        <>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {destination.label}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ wordBreak: "break-word" }}
                            >
                                {destinationSubtitle(destination)}
                            </Typography>
                        </>
                    )}
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        This removes the destination from your saved withdrawal
                        methods. Withdrawal history is kept and destinations with
                        history cannot be deleted.
                    </Typography>
                    {error && (
                        <Alert severity="error" variant="outlined">
                            {error}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={deleting}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        if (destination) deleteMutation.mutate(destination.id);
                    }}
                    color="error"
                    variant="contained"
                    disabled={deleting || destination == null}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                    startIcon={
                        deleting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : undefined
                    }
                >
                    {deleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
