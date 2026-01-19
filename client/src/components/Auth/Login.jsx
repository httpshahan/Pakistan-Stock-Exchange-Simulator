import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Loader from "../loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission if any validation fails

    try {
      // Form validation
      if (!email || !password) {
        alert("Email and password are required.");
        return;
      }

      setLoading(true);
      const data = await authService.login(email, password);

      setInvalid(false);
      setInvalidPassword(false);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("balance", data.balance);
      sessionStorage.setItem("email", data.email);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setInvalidPassword(true);
          setLoading(false);
        } else if (error.response.status === 404) {
          setInvalid(true);
          setLoading(false);
        }
      } else {
        console.error("Error during login:", error);
        setLoading(false); // Ensure loading stops on other errors
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/40">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to Pakistan Stock Exchange
          </p>
        </div>

        {(invalid || invalidPassword) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100/50 flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-red-500"></div>
            <p className="text-sm text-red-600 font-medium">
              {invalid ? "Account not found. Please check your email." : "Incorrect password. Please try again."}
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label htmlFor="password" className="block text-xs uppercase font-bold text-gray-500 tracking-wider">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-black/20"
            >
              Sign In
            </button>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <button
              onClick={handleRegisterClick}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
