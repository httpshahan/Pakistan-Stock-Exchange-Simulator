import React from "react";
import DataTable from "../components/MarketWatch/DataTable";

const MarketWatch = () => {
  return (
    <div className="flex-1 overflow-auto p-8">
      <DataTable />
    </div>
  );
};

export default MarketWatch;
