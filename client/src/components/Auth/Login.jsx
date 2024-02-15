import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission if any validation fails

    try {
      // Form validation
      if (!email || !password) {
        alert("Email and password are required.");
        return;
      }

      const data = await authService.login(email, password);

      setInvalid(false);
      setInvalidPassword(false);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("balance", data.balance);
      sessionStorage.setItem("email", data.email);

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

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600 text-gray-800">
      <div className="flex flex-col p-6 items-center justify-center w-full md:w-1/2">
        <h2 className="text-4xl font-bold">Pakistan Stock</h2>
        <h2 className="text-4xl font-bold mb-6">Exchange</h2>
        <p className="text-lg mb-8">"Invest in your future."</p>
        <div className="flex items-center mb-8">
          <em className="mr-2 text-sm text-hover-secondary">
            Don't have an account?
          </em>
          <button
            onClick={handleRegisterClick}
            className="text-lg underline focus:outline-none hover:text-yellow-100 transition-colors duration-300"
          >
            Register now
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full md:w-1/2">
        <div className="bg-white p-8 rounded shadow-md md:w-96">
          <h2 className="text-3xl font-semibold mb-6 text-stock-primary">
            Login
          </h2>
          <div className="text-red-500 mb-4">
            <p
              className="text-sm font-sans"
              style={{ display: invalid ? "block" : "none" }}
            >
              Invalid Credentials
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400 ${
                  invalid ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:border-green-400 ${
                  invalidPassword ? "border-red-500" : ""
                }`}
              />

              <div
                className="text-red-500 mt-2"
                style={{ display: invalidPassword ? "block" : "none" }}
              >
                <p className="text-sm font-sans">Invalid Password</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-8 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
