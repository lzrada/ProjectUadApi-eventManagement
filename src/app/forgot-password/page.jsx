"use client";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../services/firebase";
import Image from "next/image";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      alert("Kode telah dikirimkan ke email Anda."); // Menampilkan alert setelah berhasil
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/bg-login.jpg" alt="bg-login" className="bg-image" fill={true} />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2 mr-4">Forgot Password</button>
        </div>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <input type="email" placeholder="sugeng@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-full gradient-border focus:outline-none" required />
              <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button
            type="submit"
            className={`w-full py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/login")}
            className={`w-full py-3 mt-2 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none`}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
