import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setEmailError(email ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");
      return;
    }

    try {
      const data = await authService.adminLogin(email, password);

      setEmailError("");
      setPasswordError("");
      setInvalidPassword(false);
      setEmail("");
      setPassword("");
      sessionStorage.setItem("token", data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setPassword("");
          setInvalidPassword(true);
        } else if (error.response.status === 404) {
          setEmailError("Invalid email");
          setEmail("");
          setPassword("");
        }
      } else {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-5 text-stock-primary">
          Admin Login
        </h2>
        <form>
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
              placeholder="abc@example.com"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`mt-1 p-2 w-full border rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className={`mt-1 p-2 w-full border rounded-md ${
                invalidPassword || passwordError ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-sm font-medium cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {invalidPassword && (
              <p className="text-red-500 text-sm">Invalid password</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-green-500 mt-4 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
