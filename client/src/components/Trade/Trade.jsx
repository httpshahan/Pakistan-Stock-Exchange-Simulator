import React, { useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import BuyForm from "./Buy";
import SellForm from "./Sell";

const Trade = () => {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Trade Form</h2>
            <div className="mb-4">
              <div className="flex">
                <button
                  className={`flex-1 p-2 ${
                    activeTab === "buy" ? "bg-blue-500 text-white" : "bg-gray-300"
                  } rounded-tl-md`}
                  onClick={() => setActiveTab("buy")}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 p-2 ${
                    activeTab === "sell" ? "bg-red-500 text-white" : "bg-gray-300"
                  } rounded-tr-md`}
                  onClick={() => setActiveTab("sell")}
                >
                  Sell
                </button>
              </div>

              {activeTab === "buy" ? <BuyForm /> : <SellForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
