import type { ElementType, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

type EmptyStateProps = {
    icon?: ElementType;
    title: string;
    description?: string;
    action?: ReactNode;
};

export default function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ py: 6, textAlign: "center" }}
        >
            {Icon && <Icon sx={{ fontSize: 40, color: "text.disabled" }} />}
            <Typography variant="body2">{title}</Typography>
            {description && (
                <Typography variant="caption" color="text.secondary">
                    {description}
                </Typography>
            )}
            {action}
        </Stack>
    );
}