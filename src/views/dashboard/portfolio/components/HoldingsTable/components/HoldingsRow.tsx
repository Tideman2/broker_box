import {
    Box,
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { formatCurrency } from "@/utils/format";

import type { HoldingsRow as HoldingsRowData } from "@/views/dashboard/portfolio/utils";

const CATEGORY_COLOR: Record<string, string> = {
    FOREX: "primary.main",
    CRYPTO: "secondary.main",
    CRYPTOCURRENCY: "secondary.main",
    COMMODITY: "success.main",
    COMMODITIES: "success.main",
    INDEX: "warning.main",
    INDICES: "warning.main",
};

export const categoryColor = (category: string): string =>
    CATEGORY_COLOR[category.toUpperCase()] ?? "info.main";

type HoldingsRowProps = {
    row: HoldingsRowData;
};

export default function HoldingsRow({ row }: HoldingsRowProps) {
    const isUp = row.performance >= 0;
    const color = categoryColor(row.category);

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
                    <Box>
                        <Typography variant="body2">{row.symbol}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {row.name}
                        </Typography>
                    </Box>
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={row.category}
                    sx={{
                        color,
                        border: "1px solid",
                        borderColor: color,
                        bgcolor: "transparent",
                    }}
                />
            </TableCell>

            <TableCell>
                <Typography variant="body2">{row.amount}</Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="body2">
                    {formatCurrency(row.current_price)}
                </Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                <Typography variant="body2">
                    {formatCurrency(row.instrument_value)}
                </Typography>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={`${isUp ? "+" : ""}${row.performance.toFixed(2)}%`}
                    sx={{
                        color: isUp ? "success.main" : "error.main",
                        border: "1px solid",
                        borderColor: isUp ? "success.main" : "error.main",
                        bgcolor: "transparent",
                    }}
                />
            </TableCell>

            <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                <Tooltip title="View">
                    <IconButton size="small">
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Open chart">
                    <IconButton size="small">
                        <OpenInNewIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
