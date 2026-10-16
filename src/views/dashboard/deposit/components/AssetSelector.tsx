import { alpha } from "@mui/material/styles";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import DashboardCard from "@/components/DashboardCard";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

import type { AssetResponse } from "@/api/types";

type AssetSelectorProps = {
    assets: AssetResponse[];
    selectedId: number | null;
    onSelect: (asset: AssetResponse) => void;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

export default function AssetSelector({
    assets,
    selectedId,
    onSelect,
    loading,
    error,
    onRetry,
}: AssetSelectorProps) {
    return (
        <DashboardCard
            title="1. Select Asset"
            action={
                selectedId != null ? (
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                        {assets.length} available
                    </Typography>
                ) : undefined
            }
        >
            {loading ? (
                <LoadingState height={56} lines={2} />
            ) : error ? (
                <EmptyState
                    title="Assets unavailable"
                    description="We could not load the available assets."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : assets.length === 0 ? (
                <EmptyState
                    title="No assets available"
                    description="There are no active assets to deposit right now."
                />
            ) : (
                <Stack direction="row" sx={{ flexWrap: "wrap", rowGap: 1.5, columnGap: 1.5 }}>
                    {assets.map((asset) => {
                        const selected = asset.id === selectedId;
                        return (
                            <Box
                                key={asset.id}
                                onClick={() => onSelect(asset)}
                                sx={{
                                    minWidth: 128,
                                    flex: { xs: "1 1 calc(50% - 6px)", sm: "0 1 auto" },
                                    px: 1.5,
                                    py: 1.25,
                                    borderRadius: 2.5,
                                    border: "1.5px solid",
                                    borderColor: selected ? "primary.main" : "divider",
                                    backgroundColor: (theme) =>
                                        selected
                                            ? alpha(theme.palette.primary.main, 0.08)
                                            : "background.paper",
                                    boxShadow: selected
                                        ? (theme) =>
                                              `0 4px 16px ${alpha(theme.palette.primary.main, 0.18)}`
                                        : "none",
                                    cursor: "pointer",
                                    transition:
                                        "border-color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.2s",
                                    position: "relative",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            fontSize: "0.7rem",
                                            fontWeight: 800,
                                            backgroundColor: (theme) =>
                                                selected
                                                    ? theme.palette.primary.main
                                                    : alpha(theme.palette.primary.main, 0.12),
                                            color: selected
                                                ? "primary.contrastText"
                                                : "primary.main",
                                        }}
                                    >
                                        {asset.symbol.slice(0, 3).toUpperCase()}
                                    </Avatar>
                                    <Stack spacing={0}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                                            {asset.symbol}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                            {asset.name}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {selected && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 6,
                                            right: 6,
                                            width: 18,
                                            height: 18,
                                            borderRadius: "50%",
                                            backgroundColor: "primary.main",
                                            color: "primary.contrastText",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CheckIcon sx={{ fontSize: 13 }} />
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </DashboardCard>
    );
}
