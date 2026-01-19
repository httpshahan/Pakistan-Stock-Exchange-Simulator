import React, { useEffect, useRef } from "react";

const HeatMap = () => {
  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  const container = useRef();

  useEffect(() => {
    // Check if the script has already been appended
    if (!container.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
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
    <div className="flex-1 overflow-auto bg-[#F5F5F7] min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Market Overview</h1>
          <p className="text-gray-500 mt-1">Visual representation of market performance</p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-4">
          <div className="tradingview-widget-container rounded-2xl overflow-hidden" ref={container}></div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
