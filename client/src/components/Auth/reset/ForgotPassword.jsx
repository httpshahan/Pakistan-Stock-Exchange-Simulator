import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Initiate Password Reset, 2: Verify OTP, 3: Update Password
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    // Check if passwords match whenever they change
    setPasswordMatch(password === confirmPassword && password !== '');
  }, [password, confirmPassword]);

  const handleInitiateReset = async (e) => {
    e.preventDefault();
    try {
      await authService.checkEmail(email);
      setStep(2); // Move to next step (verify OTP)
      setMessage("OTP sent to your email");
    } catch (error) {
      setMessage("Error initiating password reset");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
        if (otp.length !== 6) {
          setMessage("Invalid OTP");
          return;
        }
      await authService.verifyOtp(email, otp);
      setStep(3); // Move to next step (update password)
      setMessage("");
    } catch (error) {
      setMessage("Invalid OTP");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }
      await authService.restPassword(email, password);
      setStep(4);
      setMessage("Password updated successfully");
    } catch (error) {
      setMessage("Error updating password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        {step === 1 && (
          <form onSubmit={handleInitiateReset}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-full"
            >
              Reset Password
            </button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                pattern="[0-9]{6}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                    const inputOTP = e.target.value.replace(/\D/g, '').slice(0, 6); // Remove non-numeric characters and limit to 6 characters
                    setOTP(inputOTP);
                  }}
                  maxLength={6}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-full"
            >
              Verify OTP
            </button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`mt-1 block w-full rounded-md border ${
                    passwordMatch ? 'border-green-500' : 'border-gray-300'
                  } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10`}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className={`mt-1 block w-full rounded-md border ${
                  passwordMatch ? 'border-green-500' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-gray-700">
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 w-full"
            >
              Update Password
            </button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
          </form>
        )}
        {step === 4 && (
          <p className="text-center">
            Password updated successfully.{" "}
            <a href="/" className="text-indigo-500">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
