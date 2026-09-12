import { Box, Button, Chip, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import { destinationSubtitle } from "./utils";

import type { DestinationResponse } from "@/api/withdraw/types";

type WalletSelectorProps = {
    destinations: DestinationResponse[];
    selectedId: number | null;
    onSelect: (destination: DestinationResponse) => void;
    onAddNew: () => void;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function WalletSelector({
    destinations,
    selectedId,
    onSelect,
    onAddNew,
    loading,
    error,
    onRetry,
}: WalletSelectorProps) {
    if (loading) return <LoadingState height={64} lines={2} />;

    if (error) {
        return (
            <EmptyState
                title="Destinations unavailable"
                description="We could not load your withdrawal destinations."
                action={
                    <Button size="small" variant="outlined" onClick={onRetry}>
                        Retry
                    </Button>
                }
            />
        );
    }

    return (
        <Grid container spacing={2}>
            {destinations.map((destination) => {
                const Icon =
                    destination.type === "BANK"
                        ? AccountBalanceIcon
                        : CurrencyBitcoinIcon;
                const selected = destination.id === selectedId;

                return (
                    <Grid key={destination.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelect(destination)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    onSelect(destination);
                                }
                            }}
                            sx={{
                                position: "relative",
                                height: "100%",
                                p: 1.5,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: selected ? "primary.main" : "divider",
                                backgroundColor: selected
                                    ? (theme) => alpha(theme.palette.primary.main, 0.08)
                                    : "background.paper",
                                cursor: "pointer",
                                transition: "border-color 0.2s ease, background-color 0.2s ease",
                                "&:hover": {
                                    borderColor: selected ? "primary.main" : (theme) => alpha(theme.palette.primary.main, 0.4),
                                },
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Chip
                                    size="small"
                                    icon={<Icon sx={{ fontSize: 14, mb: "2px" }} />}
                                    label={destination.type}
                                    sx={{
                                        height: 22,
                                        fontSize: "0.65rem",
                                        color: "primary.main",
                                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
                                        backgroundColor: "transparent",
                                    }}
                                    variant="outlined"
                                />
                                <Stack direction="row" spacing={0.5}>
                                    <Tooltip title="Coming soon">
                                        <span>
                                            <IconButton
                                                size="small"
                                                disabled
                                                aria-label="Edit destination"
                                            >
                                                <EditIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Coming soon">
                                        <span>
                                            <IconButton
                                                size="small"
                                                disabled
                                                aria-label="Delete destination"
                                            >
                                                <DeleteIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Stack>
                            </Stack>

                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, mt: 1, mb: 0.25 }}
                            >
                                {destination.label}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", wordBreak: "break-word" }}
                            >
                                {destinationSubtitle(destination)}
                            </Typography>

                            {selected && (
                                <CheckCircleIcon
                                    sx={{
                                        position: "absolute",
                                        bottom: 8,
                                        right: 8,
                                        fontSize: 18,
                                        color: "primary.main",
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                );
            })}

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                    role="button"
                    tabIndex={0}
                    onClick={onAddNew}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onAddNew();
                        }
                    }}
                    sx={{
                        height: "100%",
                        minHeight: 96,
                        p: 1.5,
                        borderRadius: 2,
                        border: "1.5px dashed",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        color: "text.secondary",
                        cursor: "pointer",
                        transition: "border-color 0.2s ease, color 0.2s ease",
                        "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.main",
                        },
                    }}
                >
                    <AddIcon />
                    <Typography variant="body2">Add New Wallet</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}