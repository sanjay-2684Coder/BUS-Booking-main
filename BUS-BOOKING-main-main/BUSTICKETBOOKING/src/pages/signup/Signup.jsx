// src/pages/signup/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import axios from "../../components/service/axiosConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate(); // ✅ setup navigation

  const handleSendOtp = async () => {
    if (!email || !fullName || !mobileNumber) {
      setMessage("Please fill all fields before sending OTP.");
      return;
    }
    try {
      await axios.post(
        "/auth/signup/login-signup-otp",
        { email, role: "CUSTOMER" },
        { skipAuth: true }
      );
      setMessage("OTP sent successfully. Please check your email.");
      setOtpSent(true);
    } catch (error) {
      setMessage("Failed to send OTP: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter OTP to complete signup.");
      return;
    }
    try {
      await axios.post(
        "/auth/signup",
        { email, fullName, mobileNumber, otp },
        { skipAuth: true }
      );
      setMessage("Signup successful! Redirecting...");
      // ✅ redirect to home page after short delay
      setTimeout(() => {
        navigate("/"); // 👈 redirect to "/"
      }, 1500); // 1.5 seconds delay to show success message
    } catch (error) {
      setMessage("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="signup-page flex flex-col items-center mt-10 space-y-4">
      <h1 className="text-3xl font-bold">Signup</h1>

      <form onSubmit={handleSignup} className="flex flex-col space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          disabled={otpSent}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="p-2 border rounded"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          disabled={otpSent}
        />

        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="p-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </button>
          </>
        )}
      </form>

      {message && <p className="text-center text-red-600">{message}</p>}
    </div>
  );
};

export default Signup;
