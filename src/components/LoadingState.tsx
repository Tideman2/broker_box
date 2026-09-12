import { Skeleton, Stack } from "@mui/material";

type LoadingStateProps = {
    height?: number;
    lines?: number;
};

export default function LoadingState({ height = 48, lines = 3 }: LoadingStateProps) {
    return (
        <Stack spacing={1}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={height} />
            ))}
        </Stack>
    );
}