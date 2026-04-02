// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500 Index"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100 Cash CFD"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR to USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "proName": "OANDA:XAUUSD",
              "title": "gold"
            },
            {
              "proName": "TVC:GOLD",
              "title": ""
            }
          ],
          "colorTheme": "light",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true
        }`;
      if (!container.current) return;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" style={{
      height: "60px", position: "fixed",
      bottom: "0", left: "0", right: "0", zIndex: "1000"
    }} ref={container}>
      <div className="tradingview-widget-container__widget" ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
