'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { useMediaQuery } from '../hook/useMediaQueries';

interface ContentWrapperProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>; // optional MUI sx prop
}

export default function ContentWrapper({ children, sx }: ContentWrapperProps) {
    const isMobile = useMediaQuery("upToSm");

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