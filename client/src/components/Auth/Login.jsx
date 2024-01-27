import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await authService.login(email, password);

      setInvalid(false);
      setInvalidPassword(false);

      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("balance", data.balance);
      console.log("Login Success");
      alert("Login Success");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setInvalidPassword(true);
        } else if (error.response.status === 404) {
          setInvalid(true);
        }
      } else {
        console.error("Error during login:", error);
      }
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div
          className="text-red-500 mb-4"
          style={{ display: invalid ? "block" : "none" }}
        >
          <p className="text-sm font-sans"> Invalid Credentials</p>
        </div>
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
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-md ${
                invalid ? "border-red-500" : ""
              }`}
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
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-md ${
                invalidPassword ? "border-red-500" : ""
              }`}
            />
            <div
              className="text-red-500 mt-2"
              style={{ display: invalidPassword ? "block" : "none" }}
            >
              <p className="text-sm font-sans"> Invalid Password</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Not registered yet?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
