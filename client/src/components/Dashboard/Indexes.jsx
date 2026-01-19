import React, { useState } from "react";
import Data from "./Data";

const Indexes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = ["KSE100", "ALLSHR", "KSE30"];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Market Indices</h2>

        <div className="flex p-1 bg-gray-100/80 rounded-xl">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setSelectedIndex(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedIndex === index
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Data symbol={tabs[selectedIndex]} isWidget={true} />
      </div>
    </div>
  );
};

export default Indexes;
