import { Chip, Stack, TableCell, TableRow, Typography } from "@mui/material";

import { formatAmount } from "@/utils/format";

import { executedAtParts } from "../../../utils";

import type { TradeResponse, TradeType } from "@/api/portfolio/types";

const TYPE_COLOR: Record<TradeType, string> = {
    BUY: "primary.main",
    SELL: "warning.main",
};

export const tradeTypeColor = (type: TradeType): string =>
    TYPE_COLOR[type] ?? "info.main";

type TradeRowProps = {
    trade: TradeResponse;
};

export default function TradeRow({ trade }: TradeRowProps) {
    const color = tradeTypeColor(trade.type);
    const executed = executedAtParts(trade.executed_at);

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                        variant="body2"
                        sx={{ minWidth: 56, fontWeight: 600 }}
                    >
                        {trade.symbol}
                    </Typography>
                    <Stack spacing={0}>
                        <Typography variant="caption" color="text.secondary">
                            {trade.name}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                            #{trade.transaction_id}
                        </Typography>
                    </Stack>
                </Stack>
            </TableCell>

            <TableCell>
                <Chip
                    size="small"
                    label={trade.type}
                    sx={{
                        color,
                        border: "1px solid",
                        borderColor: color,
                        bgcolor: "transparent",
                    }}
                />
            </TableCell>

            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Typography variant="body2">{trade.quantity}</Typography>
            </TableCell>

            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                <Typography variant="body2">{formatAmount(trade.price)}</Typography>
            </TableCell>

            <TableCell>
                <Typography variant="body2">
                    {formatAmount(trade.total_value)}
                </Typography>
            </TableCell>

            <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Stack spacing={0}>
                    <Typography variant="body2">{executed.date}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {executed.time}
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}