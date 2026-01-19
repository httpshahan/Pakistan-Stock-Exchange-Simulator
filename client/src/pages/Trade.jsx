import React, { useState } from "react";
import BuyForm from "../components/Trade/Buy";
import SellForm from "../components/Trade/Sell";

const Trade = () => {
  const [activeTab, setActiveTab] = useState("buy");

  if (!sessionStorage.getItem("token")) {
    console.log("No token");
    window.location.href = "/";
  }

  return (
    <div className="flex-1 p-8 bg-[#F5F5F7] min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Trade Stocks</h1>
          <p className="text-gray-500 mt-2">Execute your market orders instantly</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-black/5 rounded-3xl p-2 overflow-hidden">
          {/* Segmented Control */}
          <div className="flex p-1 bg-gray-100/80 rounded-2xl mb-6 mx-2 mt-2">
            <button
              onClick={() => setActiveTab("buy")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === "buy"
                  ? "bg-white text-gray-900 shadow-md transform scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === "sell"
                  ? "bg-white text-gray-900 shadow-md transform scale-[1.02]"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sell
            </button>
          </div>

          {/* Forms Container */}
          <div className="px-4 pb-6">
            {activeTab === "buy" ? <BuyForm /> : <SellForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
