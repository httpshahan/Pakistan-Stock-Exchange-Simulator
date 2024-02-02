// TradingViewWidget.js
import React, { useEffect, useRef } from 'react';

const CompanyData = ({ symbol }) => {
  const container = useRef();

  useEffect(() => {
    if (!container.current.querySelector('script')) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "PSX:${symbol}",
        "largeChartUrl": "#",
        "width": "100%",
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": true
      }`;
    container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div ref={container}>
      </div>
    </div>
  );
};

export default CompanyData;
