"use client";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../../services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await registerWithEmailAndPassword(email, password);
      console.log("Registered user:", user);
      router.push("/login");
      // Redirect to another page or show a success message
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/bg-login.jpg" alt="bg-login" className="bg-image" fill={true} />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2 mr-4">SIGN UP</button>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <input type="email" placeholder="sugeng@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-full gradient-border focus:outline-none" required />
              <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">PASSWORD</label>
            <div className="relative">
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-full gradient-border focus:outline-none" required />
              <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              "Registering..."
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>CREATE ACCOUNT
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
