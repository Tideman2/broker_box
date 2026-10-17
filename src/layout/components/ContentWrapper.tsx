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
            px={isMobile ? 2 : 8}
            py={4}
            sx={{
                width: '100%',
                maxWidth: 1280,
                mx: 'auto',
                ...sx, // merge passed sx with default styles
            }}
        >
            {children}
        </Box>
    );
}