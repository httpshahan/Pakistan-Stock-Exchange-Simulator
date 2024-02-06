import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import DataTable from "../MarketWatch/DataTable";

const MarketWatch = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-8">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default MarketWatch;
