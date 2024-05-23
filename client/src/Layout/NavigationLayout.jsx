import React from "react";
import TopNav from "../components/NavBar/TopNabar";
import SideNav from "../components/NavBar/SideNavBar";
import { Outlet } from "react-router-dom";

const NavigationLayout = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <SideNav />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NavigationLayout;
