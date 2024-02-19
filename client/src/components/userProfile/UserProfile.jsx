import React, { useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [nameEditMode, setNameEditMode] = useState(false);
  const [name, setName] = useState(sessionStorage.getItem("username"));
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Your password update logic here
    // Check old password validity and update the password

    setMessage('Password updated successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
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
              {/* Name section */}
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
              {/* Email section */}
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
            {/* Password reset section */}
            <div className="w-1/2 p-6 bg-white rounded shadow-md">
              <h4 className="text-xl font-medium text-gray-700">
                Password Reset
              </h4>
              <div className="my-1 border-t-2 border-gray-200"></div>
              <div className="p-4">
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button
                  onClick={handlePasswordUpdate}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Update Password
                </button>
                {message && <p className="text-green-500 mt-2">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
