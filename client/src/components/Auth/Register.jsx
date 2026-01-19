import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword || confirmPassword === "");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmation(true);
    setPasswordMatch(password === e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!passwordMatch) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userData = {
        username: name,
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      setLoading(false);

      if (response.status === 400) {
        setError("User already exists");
        return;
      } else if (response.status === 200) {
        window.location.href = "/";
        return;
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong. Please try later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Join Pakistan Stock Exchange today
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100/50 flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-red-500"></div>
            <p className="text-sm text-red-600 font-medium">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-5 py-4 rounded-2xl bg-white/50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300`}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-5 py-4 rounded-2xl bg-white/50 border ${confirmation && !passwordMatch ? 'border-red-300' : 'border-gray-200'} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300`}
              placeholder="••••••••"
              required
            />
            {confirmation && (
              <div className="mt-2 ml-1 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${passwordMatch ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-xs ${passwordMatch ? 'text-green-600' : 'text-red-500'} font-medium`}>
                  {passwordMatch ? "Passwords match" : "Passwords do not match"}
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              disabled={!passwordMatch && confirmation}
              className={`w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-black/20 ${(!passwordMatch && confirmation) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              Create Account
            </button>
          )}
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
