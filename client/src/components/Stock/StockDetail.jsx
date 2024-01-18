import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const StockDetails = () => {
  const { symbol } = useParams();
  console.log(symbol);

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="p-10">
          <h1 className="text-4xl font-bold">Stock Details</h1>
          <p className="text-gray-600">Stock Symbol: {symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
