import { alpha } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from "@mui/material";
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
        <DashboardCard title="1. Select Asset">
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
                <Stack direction="row" sx={{ flexWrap: "wrap", rowGap: 2, columnGap: 1.5 }}>
                    {assets.map((asset) => {
                        const selected = asset.id === selectedId;
                        return (
                            <Box
                                key={asset.id}
                                onClick={() => onSelect(asset)}
                                sx={{
                                    minWidth: 100,
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: selected ? "primary.main" : "divider",
                                    backgroundColor: (theme) =>
                                        selected
                                            ? alpha(theme.palette.primary.main, 0.08)
                                            : "background.paper",
                                    cursor: "pointer",
                                    transition: "border-color 0.2s, background-color 0.2s",
                                    position: "relative",
                                }}
                            >
                                <Stack spacing={0.25}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                        {asset.symbol}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {asset.name}
                                    </Typography>
                                </Stack>
                                {selected && (
                                    <CheckIcon
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            fontSize: 16,
                                            color: "primary.main",
                                        }}
                                    />
                                )}
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </DashboardCard>
    );
}