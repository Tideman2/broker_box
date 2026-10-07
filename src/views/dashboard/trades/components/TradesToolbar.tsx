"use client";

import {
    Button,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import { DATE_RANGE_OPTIONS, TRADE_TYPE_OPTIONS } from "../constants";
import { TRADES_CONTENT } from "../mockContent";

import type { TradeType } from "@/api/portfolio/types";
import type { AssetResponse } from "@/api/types";

type TradesToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    assets: AssetResponse[];
    instrumentId: number | null;
    onInstrumentChange: (value: number | null) => void;
    tradeType: TradeType | null;
    onTradeTypeChange: (value: TradeType | null) => void;
    days: number | null;
    onDaysChange: (value: number | null) => void;
    hasFilters: boolean;
    onClearFilters: () => void;
};

export default function TradesToolbar({
    search,
    onSearchChange,
    assets,
    instrumentId,
    onInstrumentChange,
    tradeType,
    onTradeTypeChange,
    days,
    onDaysChange,
    hasFilters,
    onClearFilters,
}: TradesToolbarProps) {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            flexWrap="wrap"
            useFlexGap
        >
            <TextField
                size="small"
                label={TRADES_CONTENT.searchLabel}
                placeholder={TRADES_CONTENT.searchPlaceholder}
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                sx={{ width: { xs: "100%", md: 280 } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                select
                size="small"
                label={TRADES_CONTENT.instrumentLabel}
                value={instrumentId ?? ""}
                onChange={(event) =>
                    onInstrumentChange(
                        event.target.value === "" ? null : Number(event.target.value)
                    )
                }
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="">
                    {TRADES_CONTENT.instrumentAll}
                </MenuItem>
                {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                        {asset.symbol} — {asset.name}
                    </MenuItem>
                ))}
            </TextField>

            <ToggleButtonGroup
                exclusive
                size="small"
                value={tradeType ?? ""}
                onChange={(_event, value: TradeType | null) =>
                    onTradeTypeChange(value)
                }
                aria-label={TRADES_CONTENT.typeLabel}
            >
                <ToggleButton value="">{TRADES_CONTENT.typeAll}</ToggleButton>
                {TRADE_TYPE_OPTIONS.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <TextField
                select
                size="small"
                label={TRADES_CONTENT.dateLabel}
                value={days ?? ""}
                onChange={(event) =>
                    onDaysChange(
                        event.target.value === "" ? null : Number(event.target.value)
                    )
                }
                sx={{ minWidth: 150 }}
            >
                {DATE_RANGE_OPTIONS.map((option) => (
                    <MenuItem key={option.label} value={option.value ?? ""}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {hasFilters && (
                <Button
                    size="small"
                    startIcon={<FilterAltOffIcon />}
                    onClick={onClearFilters}
                >
                    {TRADES_CONTENT.clearFilters}
                </Button>
            )}
        </Stack>
    );
}