import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const UserProfile = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-lg bg-stock-light">
              <h2 className="text-3xl font-bold mb-4 text-stock-primary">
                Profile
              </h2>
              <div className="border-t border-stock-secondary pt-4">
                <p className="text-lg font-semibold mb-2 text-stock-tertiary">
                  Name:
                </p>
                <p className="text-gray-800">John Doe</p>
              </div>
              <div className="border-t border-stock-secondary pt-4">
                <p className="text-lg font-semibold mb-2 text-stock-tertiary">
                  Email:
                </p>
                <p className="text-gray-800">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
