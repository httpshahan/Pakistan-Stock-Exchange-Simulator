import React, { useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [nameEditMode, setNameEditMode] = useState(false);
  const [name, setName] = useState(sessionStorage.getItem("username"));
  const [password, setPassword] = useState("");

  const email = sessionStorage.getItem("email");

  const handleNameEdit = () => {
    setNameEditMode(true);
  };

  const handleSaveName = () => {
    // Save name logic here
    setUsername(name);
    setNameEditMode(false);
  };

  const handlePasswordUpdate = () => {
    // Password update logic here
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-hidden bg-gray-100 p-8">
          <div className="container mx-auto">
            <h3 className="text-gray-700 text-3xl font-medium">Account</h3>
            <p className="mt-1 text-gray-500">Manage your account settings.</p>
          </div>
          <div className="flex gap-3 py-8">
            <div className="flex flex-col items-center p-6 w-1/2 bg-white rounded shadow-md">
              <div className="w-full">
                <h4 className="text-xl font-medium text-gray-700">Full Name</h4>
                <div className="my-1 border-t-2 border-gray-200"></div>
                {nameEditMode ? (
                  <div className="p-4 flex justify-between items-center">
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      onClick={handleSaveName}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="p-4 flex justify-between items-center">
                    <p className="text-gray-600">{username}</p>
                    <button
                      onClick={handleNameEdit}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full mt-6">
                <h4 className="text-xl font-medium text-gray-700">
                  Email Address
                </h4>
                <div className="my-1 border-t-2 border-gray-200"></div>
                <div className="p-4">
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-6 bg-white rounded shadow-md">
              <h4 className="text-xl font-medium text-gray-700">
                Password Reset
              </h4>
              <div className="my-1 border-t-2 border-gray-200"></div>
              <div className="p-4">
                <form className="w-full max-w-sm flex flex-col gap-4">
                  <div className="flex items-center border-b border-b-2 border-gray-400 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="password"
                      placeholder="Old Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border-b border-b-2 border-gray-400 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="flex items-center border-b border-b-2 border-gray-400 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePasswordUpdate}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
