"use client";

import { useState } from "react";
import {
    Alert,
    Autocomplete,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
    addBankDestination,
    addCryptoDestination,
    getAssets,
    getWithdrawDestinations,
    updateWithdrawDestination,
} from "@/app/actions/withdraw-actions";
import { withdrawQueryKeys } from "@/api/react-query-keys";

import { extractErrorMessage } from "./utils";

import type {
    AssetResponse,
    DestinationResponse,
    UpdateDestinationInput,
} from "@/api/withdraw/types";

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

type DestinationModalProps = {
    open: boolean;
    onClose: () => void;
    /** When set, the modal edits this destination instead of creating one. */
    destination?: DestinationResponse | null;
    onSaved?: (destination: DestinationResponse) => void;
    /** The edited destination no longer exists (404): clear it from the page. */
    onMissing?: (id: number) => void;
};

const EMPTY_FORM = {
    label: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    assetId: null as number | null,
    address: "",
};

const formFromDestination = (
    destination: DestinationResponse | null | undefined
): typeof EMPTY_FORM => {
    if (!destination) return EMPTY_FORM;

    return {
        label: destination.label,
        bank_name: destination.bank_name ?? "",
        account_name: destination.account_name ?? "",
        account_number: destination.account_number ?? "",
        assetId: destination.asset_id,
        address: destination.address ?? "",
    };
};

export default function DestinationModal({
    open,
    onClose,
    destination,
    onSaved,
    onMissing,
}: DestinationModalProps) {
    const queryClient = useQueryClient();
    const editing = destination != null;
    const [tab, setTab] = useState<DestinationTab>(destination?.type ?? "BANK");
    const [form, setForm] = useState(() => formFromDestination(destination));
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string>("");

    const type = destination?.type ?? tab;

    const assetsQuery = useQuery({
        queryKey: withdrawQueryKeys.assets,
        queryFn: getAssets,
        enabled: open && type === "CRYPTO",
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

    const updateMutation = useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateDestinationInput }) =>
            updateWithdrawDestination(id, input),
        onSuccess: (result) => {
            if (!result.success) {
                if (result.status === 409 && /label already used/i.test(result.error)) {
                    setErrors((previous) => ({
                        ...previous,
                        label: "A destination with this label already exists.",
                    }));
                    return;
                }
                if (result.status === 409) {
                    setServerError(
                        "This destination has a pending withdrawal. Wait for it to finish before editing."
                    );
                    return;
                }
                if (result.status === 404) {
                    invalidateDestinations();
                    if (destination) onMissing?.(destination.id);
                    onClose();
                    return;
                }
                setServerError(result.error);
                return;
            }

            queryClient.setQueryData<DestinationResponse[]>(
                withdrawQueryKeys.destinations,
                (current) =>
                    current?.map((entry) =>
                        entry.id === result.data.id ? result.data : entry
                    )
            );
            onSaved?.(result.data);
            onClose();
        },
        onError: (error) => setServerError(extractErrorMessage(error)),
    });

    const submitting =
        bankMutation.isPending ||
        cryptoMutation.isPending ||
        updateMutation.isPending;

    const setField = (
        field: keyof typeof EMPTY_FORM,
        value: string | number | null
    ) => setForm((previous) => ({ ...previous, [field]: value }));

    const handleTabChange = (
        _event: React.SyntheticEvent,
        next: DestinationTab
    ) => {
        setTab(next);
        setErrors({});
        setServerError("");
    };

    const setFieldErrors = (issues: z.ZodIssue[]) => {
        const fieldErrors: Record<string, string> = {};
        issues.forEach((issue) => {
            fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
    };

    const handleSubmit = () => {
        setErrors({});
        setServerError("");

        const label = form.label.trim();
        const labelTaken = (destinationsQuery.data ?? []).some(
            (entry) =>
                entry.id !== destination?.id &&
                entry.label.trim().toLowerCase() === label.toLowerCase()
        );

        if (labelTaken) {
            setErrors({ label: "A destination with this label already exists." });
            return;
        }

        if (type === "BANK") {
            const result = bankSchema.safeParse(form);
            if (!result.success) {
                setFieldErrors(result.error.issues);
                return;
            }

            const bank_destination = {
                bank_name: form.bank_name.trim(),
                account_name: form.account_name.trim(),
                account_number: form.account_number.trim(),
            };

            if (destination) {
                updateMutation.mutate({
                    id: destination.id,
                    input: { label, bank_destination },
                });
                return;
            }

            bankMutation.mutate({
                destination_details: { label, type: "BANK" },
                bank_destination,
            });
            return;
        }

        if (!form.assetId) {
            setErrors((previous) => ({
                ...previous,
                assetId: "Select an asset",
            }));
            return;
        }

        const result = cryptoSchema.safeParse(form);
        if (!result.success) {
            setFieldErrors(result.error.issues);
            return;
        }

        const crypto_destination = {
            asset_id: form.assetId,
            address: form.address.trim(),
        };

        if (destination) {
            updateMutation.mutate({
                id: destination.id,
                input: { label, crypto_destination },
            });
            return;
        }

        cryptoMutation.mutate({
            destination_details: { label, type: "CRYPTO" },
            crypto_destination,
        });
    };

    const activeAssets = (assetsQuery.data ?? []).filter(
        (asset) => asset.is_active
    );
    /**
     * A saved destination may reference an asset that has since been disabled.
     * Keep it selectable so the label can still be edited, but never offer other
     * disabled assets.
     */
    const savedAsset =
        destination?.asset_id != null
            ? (assetsQuery.data ?? []).find(
                (asset) => asset.id === destination.asset_id
            ) ?? null
            : null;
    const assetOptions =
        savedAsset && !savedAsset.is_active
            ? [savedAsset, ...activeAssets]
            : activeAssets;
    const selectedAsset =
        assetOptions.find((asset) => asset.id === form.assetId) ?? null;

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ pb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {editing ? "Edit Wallet Destination" : "Add New Wallet Destination"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {editing
                        ? "Update the details below. The destination type cannot be changed."
                        : "Save a bank account or crypto wallet for future withdrawals."}
                </Typography>
                {editing && (
                    <Chip
                        size="small"
                        variant="outlined"
                        icon={
                            destination.type === "BANK" ? (
                                <AccountBalanceIcon sx={{ fontSize: 14 }} />
                            ) : (
                                <CurrencyBitcoinIcon sx={{ fontSize: 14 }} />
                            )
                        }
                        label={
                            destination.type === "BANK"
                                ? "Bank destination"
                                : "Crypto destination"
                        }
                        sx={{ mt: 1, fontWeight: 600 }}
                    />
                )}
            </DialogTitle>

            {!editing && (
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    sx={{
                        px: 3,
                        mt: 1,
                        "& .MuiTab-root": {
                            fontWeight: 700,
                            textTransform: "none",
                        },
                    }}
                >
                    <Tab value="BANK" label="Bank" />
                    <Tab value="CRYPTO" label="Crypto" />
                </Tabs>
            )}

            <DialogContent sx={{ pt: 2 }}>
                <Stack spacing={2.5} sx={{ pt: 1.5 }}>
                    <TextField
                        label="Label"
                        placeholder="e.g. My savings account"
                        value={form.label}
                        onChange={(event) => setField("label", event.target.value)}
                        error={!!errors.label}
                        helperText={errors.label ?? "Labels must be unique."}
                        fullWidth
                    />

                    {type === "BANK" ? (
                        <>
                            <TextField
                                label="Bank Name"
                                value={form.bank_name}
                                onChange={(event) =>
                                    setField("bank_name", event.target.value)
                                }
                                error={!!errors.bank_name}
                                helperText={errors.bank_name}
                                fullWidth
                            />
                            <TextField
                                label="Account Name"
                                value={form.account_name}
                                onChange={(event) =>
                                    setField("account_name", event.target.value)
                                }
                                error={!!errors.account_name}
                                helperText={errors.account_name}
                                fullWidth
                            />
                            <TextField
                                label="Account Number"
                                value={form.account_number}
                                onChange={(event) =>
                                    setField("account_number", event.target.value)
                                }
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
                                options={assetOptions}
                                getOptionLabel={(asset) =>
                                    `${asset.symbol} — ${asset.name}`
                                }
                                getOptionDisabled={(asset) => !asset.is_active}
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
                                onChange={(event) =>
                                    setField("address", event.target.value)
                                }
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

            <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={submitting}
                    variant="outlined"
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    variant="contained"
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                    startIcon={
                        submitting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : undefined
                    }
                >
                    {editing ? "Save Changes" : "Save Destination"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
