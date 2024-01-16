import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import DataTable from "../MarketWatch/DataTable";

const MarketWatch = () => {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <DataTable />
      </div>
    </div>
  );
};

export default MarketWatch;
