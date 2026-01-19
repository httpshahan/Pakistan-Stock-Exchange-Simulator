import React, { useState } from "react";
import UserManagement from "../components/Admin/UserManag";
import Transactions from "../components/Admin/Transactions";

const AdminDash = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showTransactions, setShowTransactions] = useState(false);

  const handleShowUsers = () => {
    setShowUsers(true);
    setShowTransactions(false);
  };

  const handleShowTransactions = () => {
    setShowUsers(false);
    setShowTransactions(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/admin";
  };

  return (

    <div className="flex bg-[#F5F5F7] h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-full">
        <header className="flex justify-between items-center bg-white/60 backdrop-blur-md border-b border-white/40 px-8 py-4 shadow-sm z-10">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <nav className="flex bg-gray-100/50 p-1 rounded-xl">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showUsers
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={handleShowUsers}
              >
                Users
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showTransactions
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={handleShowTransactions}
              >
                Transactions
              </button>
            </nav>
            <button
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {showUsers && <UserManagement />}
            {showTransactions && (
              <Transactions />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDash;
