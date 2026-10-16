import type { ElementType, ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

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
            spacing={2}
            sx={{ py: 5, px: 2, textAlign: "center" }}
        >
            {Icon && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: "16px",
                        backgroundColor: "action.hover",
                        color: "text.secondary",
                    }}
                >
                    <Icon sx={{ fontSize: 24 }} />
                </Box>
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            {description && (
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            )}
            {action}
        </Stack>
    );
}
