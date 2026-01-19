import React, { useState } from "react";
import { FaEdit, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import apiService from "../services/apiService";
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
    setUsername(name);
    try {
      const res = await apiService.post("/auth/update-username", {
        email,
        username: name,
      });
      toast.success("Username updated successfully");
      sessionStorage.setItem("username", name);
      setNameEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update username");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
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
      if (error.response && error.response.status === 403) {
        setError("Invalid old password");
        toast.error("Invalid old password");
        return;
      } else if (error.response && error.response.status === 404) {
        setError("Invalid email");
        toast.error("Invalid email");
      }
      console.log(error);
      if (!error.response || (error.response.status !== 403 && error.response.status !== 404)) {
        setError("Internal server error");
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div className="flex-1 p-8 bg-[#F5F5F7] min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your profile and security</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100/50 text-blue-600 rounded-2xl">
                <FaUser size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Full Name
                </label>
                {nameEditMode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-white/50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between group">
                    <p className="text-lg font-medium text-gray-900">{username}</p>
                    <button
                      onClick={handleNameEdit}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-500">
                  <FaEnvelope className="text-gray-400" />
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100/50 text-amber-600 rounded-2xl">
                <FaLock size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <input
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400 transition-all"
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400 transition-all"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400 transition-all"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  onChange={handleCheck}
                />
                <label htmlFor="showPassword" class="text-sm text-gray-600">Show Password</label>
              </div>

              {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              {message && <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">{message}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:transform active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
