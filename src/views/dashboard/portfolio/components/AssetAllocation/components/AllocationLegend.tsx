import { Box, Stack, Typography } from "@mui/material";

type LegendItem = {
    symbol: string;
    color: string;
    allocation_percentage: number;
    value: number;
};

type AllocationLegendProps = {
    items: LegendItem[];
};

export default function AllocationLegend({ items }: AllocationLegendProps) {
    return (
        <Stack
            spacing={1.25}
            sx={{ width: "100%", maxWidth: 220, mx: "auto", my: "auto" }}
        >
            {items.map((item) => {
                const percentage = Number(item.allocation_percentage ?? 0).toFixed(1);

                return (
                    <Stack key={item.symbol} direction="row" spacing={1}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: item.color,
                                flexShrink: 0,
                                mt: 0.5,
                            }}
                        />
                        <Stack flex={1}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography variant="caption" color="text.secondary">
                                    {item.symbol}
                                </Typography>
                                <Typography variant="caption">
                                    {percentage}%
                                </Typography>
                            </Stack>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", opacity: 0.7 }}
                            >
                                {item.value.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                })}
                            </Typography>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    );
}