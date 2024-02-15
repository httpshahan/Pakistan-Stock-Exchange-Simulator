// UserManagement.js
import React, {useState, useEffect}from "react";
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
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Balance</th>
              <th className="px-4 py-2">Invested</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.balance}</td>
                <td className="border px-4 py-2">{(100000 - user.balance).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
