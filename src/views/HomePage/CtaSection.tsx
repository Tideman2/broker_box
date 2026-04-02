'use client';
import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ContentWrapper from '@/layout/components/ContentWrapper';
import { flower } from '@/components/exports';
import useWindowSize from '@/layout/hook/useWindowSize';

import TopSlideModal from './components/TopSlideModal';

const modalTextContent = () => {
    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom>
                Subscription Details
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                The 3% matching on annual contributions requires a subscription with Merchant box
                Gold ($5/mo) and customers must stay subscribed to Gold for 1 year from the date of the first eligible deposit to keep the full Gold match.
                The funds that earned the match must be kept in the account for at least 5 years to avoid a potential Early IRA Match Removal Fee. Match rate subject to change.
                Non-Gold customers receive a 1% match.
                Offer only applies to self-directed IRAs. For more information refer to the IRA Match FAQ.
            </Typography >
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                $435 match available to Merchant box
                Gold customers making the max 2025 IRA contribution by the IRS tax deadline ($210), and the max 2026 IRA contribution ($225).
                Merchant box
                does not provide tax advice; consult a tax advisor.
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                IRS contribution limit for 2025 is $7,000 ($8,000 if you're age 50 or older), and for 2026 is $7,500 ($8,600 if you’re age 50 or older).
                Visit the IRS site for more information. The annual tax filing deadline typically is April 15th but may vary by year or individual taxpayer circumstances.
                All IRA contributions count toward your annual limit.
            </Typography>
        </Box>
    )
}

export default function CtaSection() {
    const [open, setOpen] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 600;

    return (
        <ContentWrapper sx={{
            padding: 0,
            display: 'flex',
            width: "100%",
            flexDirection: 'column',
            justifyContent: "space-between",
            backgroundImage: `url(${flower.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: isMobile ? 'auto' : 700,
        }}>
            <Box width={"100%"} pt={15} pl={{ xs: 2, md: 10 }}>
                <Typography sx={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: "1.2" }} color="textSecondary" gutterBottom>
                    Retirement blooms. <br /> $Earn up to $435.
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    A simple broker platform UI to manage your trades and portfolio.
                </Typography>

                {/* Info + text */}
                <Box display="flex" onClick={() => setOpen(true)}
                    alignItems="center" gap={1} mt={1} sx={{ cursor: "pointer", }}>
                    <Typography variant="caption" color="textSecondary">
                        Subscription and limitations apply
                    </Typography>

                    <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                    >
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Button
                    variant="contained"
                    color="inherit"
                    sx={{ mt: 3 }}
                >
                    Get Started
                </Button>
            </Box>

            {/* second section texts and button */}
            <Box width={"100%"} p={{ xs: 2, md: 8 }}>
                <Typography variant='caption' color="textSecondary" gutterBottom>
                    Non-Gold customers receive a 1% contribution match.<br />
                    Merchant Box Gold is a subscription-based membership program of premium services offered through merchant box Gold, LLC.
                </Typography>
            </Box>
            <TopSlideModal open={open} onClose={() => { setOpen(false); }}>
                {modalTextContent()}
            </TopSlideModal>
        </ContentWrapper >
    );
}