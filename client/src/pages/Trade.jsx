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
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-md mx-auto bg-stock-light rounded-md shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-stock-primary">
          Trade Form
        </h2>
        <div className="mb-4">
          <div className="flex">
            <button
              className={`flex-1 p-2 ${
                activeTab === "buy"
                  ? "bg-stock-primary text-white"
                  : "bg-hover-primary"
              } rounded-tl-md hover:bg-stock-primary`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button
              className={`flex-1 p-2 ${
                activeTab === "sell"
                  ? "bg-stock-tertiary text-white"
                  : "bg-stock-tertiary"
              } rounded-tr-md hover:bg-hover-tertiary`}
              onClick={() => setActiveTab("sell")}
            >
              Sell
            </button>
          </div>

          {activeTab === "buy" ? <BuyForm /> : <SellForm />}
        </div>
      </div>
    </div>
  );
};

export default Trade;
