'use client';

import { Box, Typography, Button } from '@mui/material';
import ContentWrapper from '@/layout/components/ContentWrapper';

import { flower } from '@/components/exports';

export default function Hero() {
    return (
        <ContentWrapper sx={{
            padding: 0,
            backgroundImage: `url(${flower.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: 700,
        }}>
            <Box width={"100%"} pt={15} pl={10}>
                <Typography sx={{ fontSize: "70px", lineHeight: "1.2" }} color="textSecondary" gutterBottom>
                    Retirement blooms. <br /> $Earn up to $435.
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    A simple broker platform UI to manage your trades and portfolio.
                </Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ mt: 3 }}
                >
                    Get Started
                </Button>
            </Box>

            {/* second section texts and button */}
            <Box width={"100%"} p={8} sx={{ position: 'absolute', bottom: 0, left: 0 }}>
                <Typography variant='caption' color="textSecondary" gutterBottom>
                    Non-Gold customers receive a 1% contribution match.<br />
                    Merchant Box Gold is a subscription-based membership program of premium services offered through merchant box Gold, LLC.
                </Typography>
            </Box>
        </ContentWrapper >
    );
}