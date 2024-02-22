import React, { useState } from "react";
import SideNavbar from "../NavBar/SideNavBar";
import TopNavbar from "../NavBar/TopNabar";
import { FaEdit } from "react-icons/fa";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [nameEditMode, setNameEditMode] = useState(false);
  const [name, setName] = useState(sessionStorage.getItem("username"));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const email = sessionStorage.getItem("email");

  const handleCheck = () => {
    setShowPassword(!showPassword);
  };

  const handleNameEdit = () => {
    setNameEditMode(true);
  };

  const handleSaveName = async () => {
    // Save name logic here
    setUsername(name);
    const res = await apiService.post("/auth/update-username", {
      email,
      username: name,
    });
    toast.success("Username updated successfully");
    console.log(res);
    sessionStorage.setItem("username", name);
    setNameEditMode(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Password update logic here
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await apiService.post("/auth/update-old-password", {
        email,
        password: oldPassword,
        newPass: newPassword,
      });

      console.log(res);

      if (res.status === 200) {
        setMessage("Password updated successfully");
        toast.success("Password updated successfully");
        setError("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Internal server error");
        toast.error("Internal server error");
      }
    } catch (error) {
      if (error.response.status === 403) {
        setError("Invalid old password");
        toast.error("Invalid old password");
        return;
      } else if (res.status === 404) {
        setError("Invalid email");
        toast.error("Invalid email");
      }
      console.log(error);
      setError("Internal server error");
      toast.error("Internal server error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div className="container mx-auto">
            <h3 className="text-gray-700 text-3xl font-medium">Account</h3>
            <p className="mt-1 text-gray-500">Manage your account settings.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 py-8">
            <div className="flex flex-col items-center p-6 md:w-1/2 bg-white rounded shadow-md">
              {/* Name section */}
              <div className="w-full">
                <h4 className="text-xl font-medium text-gray-700">Full Name</h4>
                <div className="my-1 border-t-2 border-gray-200"></div>
                {nameEditMode ? (
                  <div className="p-4 flex justify-between items-center">
                    <input
                      type="text"
                      className="border-b border-gray-400 rounded focus:outline-none"
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
            <div className="md:w-1/2 p-6 bg-white rounded shadow-md">
              <h4 className="text-xl font-medium text-gray-700">
                Password Reset
              </h4>
              <div className="my-1 border-t-2 border-gray-200"></div>
              <div className="p-4">
                <form onSubmit={handlePasswordUpdate}>
                  <input
                    className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <input
                    className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    className="mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-between">
                    <label className="block text-gray-500 my-4">
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        onChange={handleCheck}
                      />
                      <span className="text-sm">Show Password</span>
                    </label>
                  </div>
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Password
                  </button>
                  {message && <p className="text-green-500 mt-2">{message}</p>}
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
