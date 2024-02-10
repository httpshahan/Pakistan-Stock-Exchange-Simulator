// UserManagement.js
import React from "react";

const userData = [
    { id: 1, name: "John Doe", investedMoney: "$5000" },
    { id: 2, name: "Jane Smith", investedMoney: "$7500" },
    { id: 3, name: "Alice Johnson", investedMoney: "$10000" },
    // Add more user data as needed
  ];
const UserManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        User Accounts
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Invested Money</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.investedMoney}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
