"use client";

import { useState } from "react";
import {
    Alert,
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { getAssets, getWithdrawDestinations, addBankDestination, addCryptoDestination } from "@/app/actions/withdraw-actions";
import { withdrawQueryKeys } from "@/api/react-query-keys";

import { extractErrorMessage } from "./utils";

import type { AssetResponse } from "@/api/withdraw/types";

type DestinationTab = "BANK" | "CRYPTO";

const bankSchema = z.object({
    label: z.string().trim().min(1, "Label is required"),
    bank_name: z.string().trim().min(1, "Bank name is required"),
    account_name: z.string().trim().min(1, "Account name is required"),
    account_number: z.string().trim().min(1, "Account number is required"),
});

const cryptoSchema = z.object({
    label: z.string().trim().min(1, "Label is required"),
    address: z.string().trim().min(1, "Address is required"),
});

type AddDestinationModalProps = {
    open: boolean;
    onClose: () => void;
};

const EMPTY_FORM = {
    label: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    assetId: null as number | null,
    address: "",
};

export default function AddDestinationModal({
    open,
    onClose,
}: AddDestinationModalProps) {
    const queryClient = useQueryClient();
    const [tab, setTab] = useState<DestinationTab>("BANK");
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string>("");

    const assetsQuery = useQuery({
        queryKey: withdrawQueryKeys.assets,
        queryFn: getAssets,
        enabled: open && tab === "CRYPTO",
        refetchOnWindowFocus: false,
    });

    const destinationsQuery = useQuery({
        queryKey: withdrawQueryKeys.destinations,
        queryFn: getWithdrawDestinations,
        enabled: open,
        refetchOnWindowFocus: false,
    });

    const invalidateDestinations = () => {
        queryClient.invalidateQueries({
            queryKey: withdrawQueryKeys.destinations,
        });
    };

    const bankMutation = useMutation({
        mutationFn: addBankDestination,
        onSuccess: (result) => {
            if (!result.success) {
                setServerError(result.error);
                return;
            }
            invalidateDestinations();
            onClose();
        },
        onError: (error) => setServerError(extractErrorMessage(error)),
    });

    const cryptoMutation = useMutation({
        mutationFn: addCryptoDestination,
        onSuccess: (result) => {
            if (!result.success) {
                setServerError(result.error);
                return;
            }
            invalidateDestinations();
            onClose();
        },
        onError: (error) => setServerError(extractErrorMessage(error)),
    });

    const submitting = bankMutation.isPending || cryptoMutation.isPending;

    const setField = (field: keyof typeof EMPTY_FORM, value: string | number | null) =>
        setForm((previous) => ({ ...previous, [field]: value }));

    const handleTabChange = (_event: React.SyntheticEvent, next: DestinationTab) => {
        setTab(next);
        setErrors({});
        setServerError("");
    };

    const handleSubmit = () => {
        setServerError("");

        const labelTaken = (destinationsQuery.data ?? []).some(
            (destination) =>
                destination.type === tab &&
                destination.label.trim().toLowerCase() === form.label.trim().toLowerCase()
        );

        if (labelTaken) {
            setErrors((previous) => ({ ...previous, label: "A destination with this label already exists." }));
            return;
        }

        if (tab === "BANK") {
            const result = bankSchema.safeParse(form);
            if (!result.success) {
                const fieldErrors: Record<string, string> = {};
                result.error.issues.forEach((issue) => {
                    const field = issue.path[0] as string;
                    fieldErrors[field] = issue.message;
                });
                setErrors(fieldErrors);
                return;
            }

            bankMutation.mutate({
                destination_details: { label: form.label.trim(), type: "BANK" },
                bank_destination: {
                    bank_name: form.bank_name.trim(),
                    account_name: form.account_name.trim(),
                    account_number: form.account_number.trim(),
                },
            });
            return;
        }

        if (!form.assetId) {
            setErrors((previous) => ({ ...previous, assetId: "Select an asset" }));
            return;
        }

        const result = cryptoSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        cryptoMutation.mutate({
            destination_details: { label: form.label.trim(), type: "CRYPTO" },
            crypto_destination: { asset_id: form.assetId, address: form.address.trim() },
        });
    };

    const activeAssets = (assetsQuery.data ?? []).filter((asset) => asset.is_active);
    const selectedAsset = activeAssets.find((asset) => asset.id === form.assetId) ?? null;

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add New Wallet Destination</DialogTitle>

            <Tabs value={tab} onChange={handleTabChange} sx={{ px: 3 }}>
                <Tab value="BANK" label="Bank" />
                <Tab value="CRYPTO" label="Crypto" />
            </Tabs>

            <DialogContent>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                    <TextField
                        label="Label"
                        placeholder="e.g. My savings account"
                        value={form.label}
                        onChange={(event) => setField("label", event.target.value)}
                        error={!!errors.label}
                        helperText={
                            errors.label ??
                            "Labels must be unique for the selected destination type."
                        }
                        fullWidth
                    />

                    {tab === "BANK" ? (
                        <>
                            <TextField
                                label="Bank Name"
                                value={form.bank_name}
                                onChange={(event) => setField("bank_name", event.target.value)}
                                error={!!errors.bank_name}
                                helperText={errors.bank_name}
                                fullWidth
                            />
                            <TextField
                                label="Account Name"
                                value={form.account_name}
                                onChange={(event) => setField("account_name", event.target.value)}
                                error={!!errors.account_name}
                                helperText={errors.account_name}
                                fullWidth
                            />
                            <TextField
                                label="Account Number"
                                value={form.account_number}
                                onChange={(event) => setField("account_number", event.target.value)}
                                error={!!errors.account_number}
                                helperText={errors.account_number}
                                fullWidth
                            />
                        </>
                    ) : (
                        <>
                            <Autocomplete
                                value={selectedAsset}
                                onChange={(_event, asset: AssetResponse | null) =>
                                    setField("assetId", asset?.id ?? null)
                                }
                                options={activeAssets}
                                getOptionLabel={(asset) =>
                                    `${asset.symbol} — ${asset.name}`
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                loading={assetsQuery.isLoading}
                                noOptionsText="No assets available"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Asset"
                                        placeholder="Select the network asset"
                                        error={!!errors.assetId}
                                        helperText={errors.assetId}
                                    />
                                )}
                                fullWidth
                            />
                            <TextField
                                label="Wallet Address"
                                value={form.address}
                                onChange={(event) => setField("address", event.target.value)}
                                error={!!errors.address}
                                helperText={errors.address}
                                fullWidth
                            />
                        </>
                    )}

                    {serverError && (
                        <Alert severity="error" variant="outlined">
                            {serverError}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button onClick={onClose} disabled={submitting} variant="outlined">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    variant="contained"
                    startIcon={
                        submitting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : undefined
                    }
                >
                    Save Destination
                </Button>
            </DialogActions>
        </Dialog>
    );
}