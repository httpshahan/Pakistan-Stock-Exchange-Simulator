import React, { useEffect, useRef } from 'react';
import SideNavbar from '../NavBar/SideNavBar';
import TopNavbar from '../NavBar/TopNabar';

const HeatMap = () => {
  if (!sessionStorage.getItem('token')) {
    console.log("No token");
    window.location.href = '/';
  }

  const container = useRef();

  useEffect(() => {
    // Check if the script has already been appended
    if (!container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `{
        "exchanges": [],
        "dataSource": "PSXKSE100",
        "grouping": "sector",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "locale": "en",
        "symbolUrl": "http://localhost:5173/watchlist",	
        "colorTheme": "light",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": false,
        "hasSymbolTooltip": true,
        "width": "100%",
        "height": 500
      }`;
      container.current.appendChild(script);
    }
  }, []); // Run only once after the initial render

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex flex-col">
              <h1 className="text-2xl mb-4 font-semibold">Indices</h1>
            </div>
            <div className="tradingview-widget-container" ref={container}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
