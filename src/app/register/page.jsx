"use client";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../../services/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <Image src="/images/bg-konser.jpg" alt="bg-register" className="absolute inset-0 z-0 object-cover" fill={true} />
      <div className="bg-black bg-opacity-50 absolute inset-0"></div> 
      <div className="absolute top-6 left-6">
                        <img src="/images/logo epep.png" alt="Logo" className="w-30 h-10 shadow-md"/>
                    </div>
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Sign Up</h2>
        <form onSubmit={handleRegister}>
        <div className="mb-4">
            <div className="flex items-center py-2 bg-white bg-opacity-20 rounded-lg">
              <FontAwesomeIcon icon={faEnvelope} className="text-white ml-3 mr-4 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none bg-transparent rounded-xl border-none w-full placeholder-gray-200 text-white py-1.5 px-2 leading-tight focus:outline-none" required />
              <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center py-2 bg-white bg-opacity-20 rounded-lg">
              <FontAwesomeIcon icon={faLock} className="text-white ml-3 mr-4 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none bg-transparent rounded-xl border-none w-full placeholder-gray-200 text-white py-1.5 px-2 leading-tight focus:outline-none" required />
              <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-transparent border-2 border-white text-white w-full px-6 py-2 rounded-full font-medium shadow-md hover:bg-white hover:text-black transition-colors"
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
