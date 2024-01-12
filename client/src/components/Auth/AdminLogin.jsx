import React, { useState } from 'react';

const AdminLogin = () => {
  const [Adminemail, setAdminEmail] = useState('');
  const [Adminpassword, setAdminPassword] = useState('');

  const handleLogin = async () => {
    
    console.log('Logging in with:', { Adminemail, Adminpassword });

    const userData = {
      email: Adminemail,
      password: Adminpassword,
    };

    console.log(userData);
    const response = await fetch('http://localhost:3000/api/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);

    // API call to authenticate the user
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={Adminemail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={Adminpassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
