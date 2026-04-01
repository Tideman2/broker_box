'use client';

import { Box, SxProps, Theme } from '@mui/material';
import useWindowSize from '../hook/useWindowSize';

interface ContentWrapperProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>; // optional MUI sx prop
}

export default function ContentWrapper({ children, sx }: ContentWrapperProps) {
    const { width } = useWindowSize();
    const isMobile = width < 600;

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