import React, { useState } from "react";

import UserManagement from "./UserManag";
import Transactions from "./Transactions";


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
    <div className="flex bg-gray-100 h-screen">
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between bg-white">
          <h1 className="text-3xl font-bold p-6">Admin Dashboard</h1>
          <nav className="flex">
            <button className="px-4 py-2 rounded-lg m-6">Dashboard</button>
            <button
              className="px-4 py-2 rounded-lg m-6"
              onClick={handleShowUsers}
            >
              Users
            </button>
            <button
              className="px-4 py-2 rounded-lg m-6"
              onClick={handleShowTransactions}
            >
              Transactions
            </button>
          </nav>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg m-6"
            onClick={handleLogout}
            >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 justify-center overflow-x-auto">
          <div className="mb-8">
            {showUsers && <UserManagement />}
            {showTransactions && (
              <div className="p-8">
                <Transactions />
              </div>
            )}
          </div>
        </main>

        <footer className="bg-white py-4 px-6 border-t">
          <p className="text-sm text-gray-600">
            © 2024 Stock Exchange Simulator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDash;
