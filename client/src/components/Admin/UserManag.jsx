// UserManagement.js
import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.get("/auth/users")
      setUserData(data.data);
    };
    fetchData();
  }, []);
  console.log(userData);

  return (

    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight">User Accounts</h3>
        <p className="text-sm text-gray-500 mt-1">Manage system users and their balances</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/60">
              {["Name", "Email", "Balance", "Invested"].map((header, index) => (
                <th key={index} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-4 px-4 first:pl-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {userData.map((user) => (
              <tr key={user.id} className="group hover:bg-white/50 transition-colors duration-150">
                <td className="py-4 px-4 first:pl-2">
                  <div className="font-semibold text-gray-900">{user.username}</div>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">Rs {user.balance.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">Rs {(100000 - user.balance).toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
