import { Skeleton, Stack } from "@mui/material";

type LoadingStateProps = {
    height?: number;
    lines?: number;
};

export default function LoadingState({ height = 48, lines = 3 }: LoadingStateProps) {
    return (
        <Stack spacing={2} role="status" aria-label="Loading">
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rounded"
                    height={height}
                    sx={{ borderRadius: "12px" }}
                />
            ))}
        </Stack>
    );
}
