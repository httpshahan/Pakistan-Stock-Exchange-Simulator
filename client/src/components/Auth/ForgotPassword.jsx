import React, { useState, useEffect } from "react";
import authService from "../../services/authService";

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
    <div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
    {step === 1 && (
      <form onSubmit={handleInitiateReset}>
        <input
          type="email"
          id="email"
          class="mt-4 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          class="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 w-full"
        >
          Reset Password
        </button>
        {message && <p class="mt-2 text-red-500">{message}</p>}
      </form>
    )}
    {step === 2 && (
      <form onSubmit={handleVerifyOTP}>
        <input
          type="text"
          id="otp"
          pattern="[0-9]{6}"
          class="mt-4 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="OTP"
          value={otp}
          onChange={(e) => {
            const inputOTP = e.target.value.replace(/\D/g, '').slice(0, 6);
            setOTP(inputOTP);
          }}
          maxLength={6}
          required
        />
        <button
          type="submit"
          class="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 w-full"
        >
          Verify OTP
        </button>
        {message && <p class="mt-2 text-red-500">{message}</p>}
      </form>
    )}
    {step === 3 && (
      <form onSubmit={handleUpdatePassword}>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          class={`mt-4 p-2 block w-full rounded-md border ${passwordMatch ? 'border-green-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10`}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          class={`mt-4 p-2 block w-full rounded-md border ${passwordMatch ? 'border-green-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div class="mb-4">
          <input
            type="checkbox"
            id="showPassword"
            class="mr-2"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label for="showPassword" class="text-gray-700">Show Password</label>
        </div>
        <button
          type="submit"
          class="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 w-full"
        >
          Update Password
        </button>
        {message && <p class="mt-2 text-red-500">{message}</p>}
      </form>
    )}
    {step === 4 && (
      <p class="text-center mt-4">
        Password updated successfully.{" "}
        <a href="/" class="text-indigo-500">Login</a>
      </p>
    )}
  </div>
</div>


  );
};

export default PasswordReset;
