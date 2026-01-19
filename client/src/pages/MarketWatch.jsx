import React from "react";
import DataTable from "../components/MarketWatch/DataTable";

const MarketWatch = () => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-[#F5F5F7] min-h-screen">
      <DataTable />
    </div>
  );
};

export default MarketWatch;
