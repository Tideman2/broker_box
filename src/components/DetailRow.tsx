import { Box, Stack, Typography } from "@mui/material";

type DetailRowProps = {
    label: string;
    value?: string;
    valueNode?: React.ReactNode;
};

export default function DetailRow({ label, value, valueNode }: DetailRowProps) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ py: 1 }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flexShrink: 0 }}
            >
                {label}
            </Typography>
            {valueNode ? (
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "flex-end",
                        minWidth: 0,
                    }}
                >
                    {valueNode}
                </Box>
            ) : (
                <Typography
                    variant="body2"
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        fontWeight: 600,
                        textAlign: "right",
                        wordBreak: "break-word",
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {value || "—"}
                </Typography>
            )}
        </Stack>
    );
}
