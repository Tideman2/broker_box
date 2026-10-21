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
    onEdit: (destination: DestinationResponse) => void;
    onDelete: (destination: DestinationResponse) => void;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function WalletSelector({
    destinations,
    selectedId,
    onSelect,
    onAddNew,
    onEdit,
    onDelete,
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
        <Grid container spacing={1.5}>
            {destinations.map((destination) => {
                const Icon =
                    destination.type === "BANK"
                        ? AccountBalanceIcon
                        : CurrencyBitcoinIcon;
                const selected = destination.id === selectedId;

                return (
                    <Grid key={destination.id} size={{ xs: 12, sm: 6 }}>
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
                                p: 1.75,
                                borderRadius: 2.5,
                                border: "1.5px solid",
                                borderColor: selected ? "primary.main" : "divider",
                                backgroundColor: selected
                                    ? (theme) => alpha(theme.palette.primary.main, 0.07)
                                    : "background.paper",
                                boxShadow: selected
                                    ? (theme) =>
                                          `0 4px 16px ${alpha(theme.palette.primary.main, 0.16)}`
                                    : "none",
                                cursor: "pointer",
                                transition: "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                                "&:hover": {
                                    borderColor: "primary.main",
                                    transform: "translateY(-1px)",
                                },
                                "&:focus-visible": {
                                    outline: "2px solid",
                                    outlineColor: "primary.main",
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Chip
                                    size="small"
                                    icon={<Icon sx={{ fontSize: 14 }} />}
                                    label={destination.type}
                                    sx={{
                                        height: 24,
                                        fontSize: "0.65rem",
                                        fontWeight: 800,
                                        letterSpacing: "0.06em",
                                        color: selected ? "primary.contrastText" : "primary.main",
                                        backgroundColor: selected
                                            ? "primary.main"
                                            : (theme) => alpha(theme.palette.primary.main, 0.1),
                                        "& .MuiChip-icon": {
                                            color: "inherit",
                                        },
                                    }}
                                />
                                <Stack direction="row" spacing={0}>
                                    <Tooltip title="Edit destination">
                                        <IconButton
                                            size="small"
                                            aria-label={`Edit ${destination.label}`}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onEdit(destination);
                                            }}
                                            onKeyDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        >
                                            <EditIcon sx={{ fontSize: 15 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete destination">
                                        <IconButton
                                            size="small"
                                            aria-label={`Delete ${destination.label}`}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onDelete(destination);
                                            }}
                                            onKeyDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        >
                                            <DeleteIcon sx={{ fontSize: 15 }} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Stack>

                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 700, mt: 1, mb: 0.25 }}
                                noWrap
                            >
                                {destination.label}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", wordBreak: "break-word", pr: 3 }}
                            >
                                {destinationSubtitle(destination)}
                            </Typography>

                            {selected && (
                                <CheckCircleIcon
                                    sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        right: 10,
                                        fontSize: 20,
                                        color: "primary.main",
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                );
            })}

            <Grid size={{ xs: 12, sm: 6 }}>
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
                        minHeight: 108,
                        p: 1.5,
                        borderRadius: 2.5,
                        border: "1.5px dashed",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.75,
                        color: "text.secondary",
                        cursor: "pointer",
                        transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
                        "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.main",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.04),
                        },
                        "&:focus-visible": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: 2,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.1),
                        }}
                    >
                        <AddIcon sx={{ color: "primary.main" }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        Add New Wallet
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
