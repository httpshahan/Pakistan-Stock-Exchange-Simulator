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
          {/* <footer className="bg-white py-4 px-6 border-t m-0">
            <p className="text-sm text-gray-600">
              © 2024 Stock Exchange Simulator
            </p>
          </footer> */}
        </div>
      </div>
    </>
  );
};

export default NavigationLayout;
