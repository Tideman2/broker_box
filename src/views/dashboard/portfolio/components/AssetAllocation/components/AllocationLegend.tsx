import { Box, Stack, Typography } from "@mui/material";

import { formatPercent } from "@/utils/format";

type LegendItem = {
    category: string;
    color: string;
    percentage: number;
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
            {items.map((item) => (
                <Stack key={item.category} direction="row" spacing={1}>
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
                                {item.category}
                            </Typography>
                            <Typography variant="caption">
                                {formatPercent(item.percentage)}
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
            ))}
        </Stack>
    );
}