'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { useAppLayout } from '@/contexts/app_layout/context';

interface ContentWrapperProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>; // optional MUI sx prop
}

export default function ContentWrapper({ children, sx }: ContentWrapperProps) {
    const { isMobile } = useAppLayout();

    return (
        <Box
            px={isMobile ? 0 : 8}
            py={4}
            sx={{
                ...sx, // merge passed sx with default styles
            }}
        >
            {children}
        </Box>
    );
}