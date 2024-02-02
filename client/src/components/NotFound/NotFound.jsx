import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const NotFound = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex flex-col flex-1">
        <TopNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-stock-secondary mb-4">
              404 Not Found
            </h1>
            <p className="text-hover-light mb-6">
              Sorry, the page you are looking for does not exist.
            </p>
            <p className="text-stock-light">
              <a href="/dashboard" className="text-stock-tertiary">
                Return to the home page
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
