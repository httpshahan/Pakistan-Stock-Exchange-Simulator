import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmation(true);
    setPasswordMatch(password === e.target.value);
  };

  const handleRegister = async () => {
    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    try {
      console.log("Registering user...");
      const userData = {
        username: name,
        email: email,
        password: password,
      };
      console.log(userData);

      const response = await fetch(
        "http://localhost:3000/api/auth/adminRegister",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.status === 400) {
        console.log("User already exists");
        setError("User already exists");
        return;
      } else if (response.status === 200) {
        console.log("User registered successfully");
        window.location.href = "/admin";
        return;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="flex justify-center items-center w-full md:w-1/2">
        <div className="bg-white p-8 rounded shadow-md w-96 m-8">
          <h2 className="text-3xl font-semibold mb-4 text-green-500">
            Register
          </h2>
          {error && (
            <div className="text-red-500 mb-4">
              <p className="text-sm font-sans">{error}</p>
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400 ${
                  confirmation
                    ? passwordMatch
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400 ${
                  confirmation
                    ? passwordMatch
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
                required
              />
              {confirmation && (
                <span
                  className={`${
                    passwordMatch ? "text-green-500" : "text-red-500"
                  } ml-2`}
                >
                  {passwordMatch
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!passwordMatch}
              className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                !passwordMatch && "cursor-not-allowed opacity-50"
              }`}
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 md:flex md:justify-center md:items-center mt-4 md:mt-0 hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-hover-secondary">
            Pakistan Stock Exchange
          </h2>
          <p className="text-lg mb-4">"Admin Pannel"</p>
          <Link
            to="/admin"
            className="text-lg underline focus:outline-none hover:text-yellow-100 transition-colors duration-300"
          >
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
