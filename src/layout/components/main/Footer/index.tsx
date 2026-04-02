'use client';
import React from 'react';
import { Box, Container } from '@mui/material';
import FooterLinks from './components/FooterLinks';
import FooterSocial from './components/FooterSocial';
import FooterCopyright from './components/FooterCopyRight';

const FooterMain = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                py: { xs: 6, md: 8 },
                backgroundColor: 'background.paper',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="lg">
                <FooterLinks />
                <FooterSocial />
                <FooterCopyright />
            </Container>
        </Box>
    );
};

export default FooterMain;