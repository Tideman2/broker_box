import { Stack, Typography } from "@mui/material";

type DetailRowProps = {
    label: string;
    value?: string;
    valueNode?: React.ReactNode;
};

export default function DetailRow({ label, value, valueNode }: DetailRowProps) {
    return (
        <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            {valueNode ?? (
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, textAlign: "right", wordBreak: "break-word" }}
                >
                    {value || "—"}
                </Typography>
            )}
        </Stack>
    );
}