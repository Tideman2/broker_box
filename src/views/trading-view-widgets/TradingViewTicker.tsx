'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';

export default function TradingViewTicker() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
        script.type = "module";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <Box sx={{ width: '100%', height: '50px', overflow: 'visible' }}>
            <tv-ticker-tape
                symbols="FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD"
            />
        </Box>
    );
}