'use client';
import { useState } from 'react';
import { Box, Typography, Stack, Button, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ContentWrapper from '@/layout/components/ContentWrapper';
import { investing_laptop } from '@/components/exports';

import TopSlideModal from './components/TopSlideModal';

const modalOfferRangesContent = () => {
    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom>
                Offer Tiers & Trading Tools
            </Typography>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                Merchant Box provides multiple offer tiers designed to match different trading needs and experience levels.
                Each tier gives users access to a specific range of trading tools, signals, and automation capabilities.
                Basic offers include standard trading signals, limited analytics, and manual execution tools to help users make informed decisions.
            </Typography>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                Mid-tier offers expand on this by providing enhanced analytics, faster signal updates, and access to semi-automated trading tools.
                These tools assist users in executing trades more efficiently while still allowing for manual control and customization.
            </Typography>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                Premium and high-end offers unlock the full potential of the Merchant Box platform.
                These include advanced AI-driven trading insights, predictive analytics, and automated trading bots that can execute trades based on real-time market conditions.
                AI-powered tools analyze patterns, trends, and historical data to provide smarter and faster trading decisions.
            </Typography>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                Higher-tier subscriptions also include priority access to new features, improved execution speeds, and enhanced risk management tools.
                The performance and behavior of trading tools may vary depending on the selected offer tier.
                Users are encouraged to review each tier carefully to choose the one that best fits their trading goals.
            </Typography>
        </Box>
    );
};

export default function TradingSkillsSection() {
    const [open, setOpen] = useState(false);

    return (
        <ContentWrapper sx={{
            padding: 0,
            paddingRight: { md: 30 },
            width: "100%",
            backgroundImage: `url(${investing_laptop.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: { xs: 'auto', md: 700 },
        }}>
            <Stack height={"100%"} spacing={1} pt={15} pl={{ xs: 2, md: 10 }}
                alignItems={"end"} justifyContent={"space-around"}>
                <Box>
                    <Typography variant="h4" color="info" gutterBottom>
                        Intuitive trading tools.
                    </Typography>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        Build your strategy<br />
                        and track market <br />
                        trends, seamlessly
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Manage your trades, track your portfolio <br />
                        and stay ahead in the market.
                    </Typography>

                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ mt: 3 }}
                    >
                        Learn more
                    </Button>
                </Box>

                {/* second section texts and button */}
                <Stack>
                    <Typography variant='caption' color="textSecondary" gutterBottom>
                        Stocks & funds offered through Merchant box Financial.
                    </Typography>

                    <Box display="flex" onClick={() => setOpen(true)}
                        alignItems="center" gap={1} mt={1} sx={{ cursor: "pointer", textDecoration: "underline" }}>
                        <Typography variant="caption" color="textSecondary">
                            About offer tiers and trading tools
                        </Typography>

                        <IconButton
                            size="small"
                            sx={{ color: 'text.secondary' }}
                        >
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant='caption' color="textSecondary" gutterBottom>
                        Crypto offered through Merchant box. See our Fee Schedule for more details.
                    </Typography>
                </Stack>
            </Stack>

            <TopSlideModal open={open} onClose={() => { setOpen(false); }}>
                {modalOfferRangesContent()}
            </TopSlideModal>
        </ContentWrapper >
    );
}