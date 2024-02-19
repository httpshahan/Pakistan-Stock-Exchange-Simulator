import React from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";

const UserProfile = () => {
  const userName = sessionStorage.getItem("username");
  const userEmail = sessionStorage.getItem("email");
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Account</h3>
            <p className="mt-1 text-gray-500">
              {" "}
              Manage your account settings.{" "}
            </p>
          </div>
          <div className="flex items-center p-6">
            <div className="w-full">
              <h4 className="text-xl font-medium text-gray-700">Profile</h4>
              <div className="my-1 border-t-2 border-gray-200"></div>
              <div className="flex flex-col mt-4">
                <div>
                  <div className="flex flex-col w-64">
                    <div className="w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        className="w-full text-sm border-2 border-gray-200 rounded px-3 py-2 mt-1"
                        disabled
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        value={userEmail}
                        className="w-full text-sm border-2 border-gray-200 rounded px-3 py-2 mt-1"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
