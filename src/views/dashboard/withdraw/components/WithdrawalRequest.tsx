"use client";

import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SendIcon from "@mui/icons-material/Send";

import DashboardCard from "@/components/DashboardCard";

import WithdrawalProgress from "./WithdrawalProgress";
import WalletSelector from "./WalletSelector";

import { toNumber } from "./utils";
import { IMPORTANT_NOTE, MIN_WITHDRAW_AMOUNT } from "./mockContent";

import type { DestinationResponse } from "@/api/withdraw/types";

type WithdrawalRequestProps = {
    balance?: number;
    destinations: DestinationResponse[];
    selectedId: number | null;
    onSelect: (destination: DestinationResponse) => void;
    onAddNew: () => void;
    destinationsLoading?: boolean;
    destinationsError?: boolean;
    destinationsRetry?: () => void;
    submitting?: boolean;
    onSubmit: (amount: number, destinationId: number) => void;
};

export default function WithdrawalRequest({
    balance,
    destinations,
    selectedId,
    onSelect,
    onAddNew,
    destinationsLoading,
    destinationsError,
    destinationsRetry,
    submitting,
    onSubmit,
}: WithdrawalRequestProps) {
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState<string>("");

    const numericAmount = toNumber(amount);

    const handleMax = () => {
        setAmount(String(toNumber(balance)));
        setAmountError("");
    };

    const handleSubmit = () => {
        if (!selectedId) {
            setAmountError("Select a destination wallet first.");
            return;
        }
        if (!amount.trim()) {
            setAmountError("Enter an amount to withdraw.");
            return;
        }
        if (numericAmount < MIN_WITHDRAW_AMOUNT) {
            setAmountError(
                `Minimum withdrawal amount is $${MIN_WITHDRAW_AMOUNT.toLocaleString()}.`
            );
            return;
        }
        if (numericAmount > toNumber(balance)) {
            setAmountError("Amount exceeds your available balance.");
            return;
        }
        setAmountError("");
        onSubmit(numericAmount, selectedId);
    };

    const maxReached =
        toNumber(balance) > 0 && numericAmount >= toNumber(balance);

    return (
        <DashboardCard title="Withdrawal Request">
            <Stack spacing={3} sx={{ pt: 1 }}>
                <Box
                    sx={{
                        px: { xs: 0, sm: 2 },
                        py: 1,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.04),
                    }}
                >
                    <WithdrawalProgress activeStage={0} />
                </Box>

                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={1}>
                        <Typography variant="subtitle2">Amount to Withdraw</Typography>
                        <Typography variant="caption" color="text.secondary">
                            Min: ${MIN_WITHDRAW_AMOUNT.toLocaleString()}.00
                        </Typography>
                    </Stack>

                    <TextField
                        value={amount}
                        onChange={(event) => {
                            setAmount(event.target.value);
                            setAmountError("");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") handleSubmit();
                        }}
                        error={!!amountError}
                        helperText={amountError}
                        placeholder="0.00"
                        disabled={toNumber(balance) <= 0}
                        inputMode="decimal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">$</InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        size="small"
                                        onClick={handleMax}
                                        disabled={toNumber(balance) <= 0 || maxReached}
                                        sx={{ color: "primary.main", minWidth: 48 }}
                                    >
                                        MAX
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" mb={1.5}>
                        Select Destination Wallet
                    </Typography>

                    <WalletSelector
                        destinations={destinations}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        onAddNew={onAddNew}
                        loading={destinationsLoading}
                        error={destinationsError}
                        onRetry={destinationsRetry}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    <InfoOutlinedIcon
                        sx={{ fontSize: 18, color: "info.main", mt: 0.25, flexShrink: 0 }}
                    />
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} mb={0.25}>
                            Important Note
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {IMPORTANT_NOTE}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={
                        submitting ||
                        destinations.length === 0 ||
                        toNumber(balance) <= 0
                    }
                    startIcon={submitting ? undefined : <SendIcon />}
                >
                    {submitting ? "Processing..." : "Confirm Withdrawal Request"}
                </Button>

                {destinations.length === 0 && !destinationsLoading && !destinationsError && (
                    <Alert severity="info" variant="outlined">
                        Add a withdrawal destination to request a withdrawal.
                    </Alert>
                )}
            </Stack>
        </DashboardCard>
    );
}