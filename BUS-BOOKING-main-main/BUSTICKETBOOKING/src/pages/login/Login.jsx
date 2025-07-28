import React, { useState } from "react";
import axiosInstance from "../../components/service/axiosConfig"; // corrected import

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    try {
      await axiosInstance.post(
        "/auth/signup/login-signup-otp",
        {
          email,
          role: "CUSTOMER", // Adjust role as necessary
        },
        {
          skipAuth: true, // 🚀 skip adding JWT
        }
      );
      setMessage("OTP sent to your email.");
      setOtpSent(true);
    } catch (error) {
      setMessage("Failed to send OTP: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      setMessage("Please enter both email and OTP.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/auth/signin",
        {
          email,
          otp,
        },
        {
          skipAuth: true, // 🚀 skip adding JWT
        }
      );
      localStorage.setItem("jwtToken", response.data.jwt);
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-page p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        {otpSent && (
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-full"
          />
        )}
        {!otpSent ? (
          <button
            type="button"
            onClick={sendOtp}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        )}
      </form>
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Login;
