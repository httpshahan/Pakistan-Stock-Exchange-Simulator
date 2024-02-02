import React, { useEffect, useRef } from 'react';

const CompanyDetails = ({ symbol, type }) => {
  const container = useRef();

  useEffect(() => {
    if (!container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;

      if (type === 'financials') {
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
        script.innerHTML = `
          {
            "isTransparent": false,
            "largeChartUrl": "",
            "displayMode": "regular",
            "width": "100%",
            "height": "850",
            "colorTheme": "light",
            "symbol": "PSX:${symbol}",
            "locale": "en"
          }`;
      } else if (type === 'symbolProfile') {
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
        script.innerHTML = `
          {
            "width": "100%",
            "height": "auto",
            "isTransparent": false,
            "colorTheme": "light",
            "symbol": "PSX:${symbol}",
            "locale": "en"
          }`;
      }

      container.current.appendChild(script);
    }
  }, [symbol, type]);


  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={container}></div>
    </div>
  );
};

export default CompanyDetails;
