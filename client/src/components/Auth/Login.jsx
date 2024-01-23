import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleLogin = async () => {
    //  login logic
    const userData = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 404) {
      setInvalid(true);
      console.log("Invalid Credentials");
      alert("Email not Found");
      return;
    } else if (response.status === 401) {
      setInvalidPassword(true);
      setPassword("");
      alert("Invalid Password");
      return;
    } else if (response.status === 200) {
      setInvalid(false);
      setInvalidPassword(false);
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("userName", data.username);
      console.log("Login Success");
      alert("Login Success");
      naviagte("/dashboard");
      return;
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
