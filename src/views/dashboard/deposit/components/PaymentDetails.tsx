import { useState } from "react";
import {
    Box,
    Button,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DashboardCard from "@/components/DashboardCard";

import { toNumber } from "@/utils/format";

import {
    COPY_ADDRESS_SUCCESS,
    DEPOSIT_NOTE,
    NO_ADDRESS_MESSAGE,
} from "./mockContent";

import type { AssetResponse } from "@/api/types";

type PaymentDetailsProps = {
    asset: AssetResponse | null;
    submitting?: boolean;
    onSubmit: (amount: number) => void;
};

export default function PaymentDetails({
    asset,
    submitting,
    onSubmit,
}: PaymentDetailsProps) {
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState<string>("");
    const [copied, setCopied] = useState(false);

    const hasAddress = Boolean(asset?.address);

    const handleCopy = async () => {
        if (!asset?.address) return;
        try {
            await navigator.clipboard.writeText(asset.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    const handleSubmit = () => {
        if (!asset) {
            setAmountError("Select an asset to deposit first.");
            return;
        }
        if (!hasAddress) {
            setAmountError("No wallet address available for the selected asset.");
            return;
        }
        if (!amount.trim()) {
            setAmountError("Enter an amount to deposit.");
            return;
        }
        const numeric = toNumber(amount);
        if (!Number.isFinite(numeric) || numeric <= 0) {
            setAmountError("Enter a valid amount greater than zero.");
            return;
        }
        setAmountError("");
        onSubmit(numeric);
    };

    return (
        <DashboardCard title="2. Payment Details">
            <Stack spacing={3}>
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                    >
                        <Typography variant="subtitle2">Deposit Address</Typography>
                        {hasAddress && (
                            <Button
                                size="small"
                                onClick={handleCopy}
                                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                                sx={{ color: copied ? "success.main" : "primary.main" }}
                            >
                                {copied ? COPY_ADDRESS_SUCCESS : "Copy"}
                            </Button>
                        )}
                    </Stack>

                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "background.paper",
                        }}
                    >
                        {asset ? (
                            hasAddress ? (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: "monospace",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {asset.address}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    {NO_ADDRESS_MESSAGE}
                                </Typography>
                            )
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Select an asset to see its deposit address.
                            </Typography>
                        )}
                    </Box>
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
                        backgroundColor: (theme) =>
                            alpha(theme.palette.info.main, 0.04),
                    }}
                >
                    <InfoOutlinedIcon
                        sx={{ fontSize: 18, color: "info.main", mt: 0.25, flexShrink: 0 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        {DEPOSIT_NOTE}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" mb={1}>
                        Deposit Amount
                    </Typography>
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
                        inputMode="decimal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">$</InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={submitting || !asset || !hasAddress}
                    startIcon={submitting ? undefined : <SendIcon />}
                >
                    {submitting ? "Processing..." : "Confirm Deposit Request"}
                </Button>
            </Stack>
        </DashboardCard>
    );
}