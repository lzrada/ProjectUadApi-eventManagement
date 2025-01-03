"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import { loginWithEmailAndPassword } from "../../../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/../api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await response.json(); // Ambil data dari API

      if (data.token) {
        localStorage.setItem("token", data.token); // Menyimpan token ke localStorage
        console.log("Token disimpan:", data.token); // Debugging token

        if (email === "admin@gmail.com" && password === "12345678") {
          router.push("/dashboard-admin");
        } else {
          router.push("/dashboard-user");
        }
      } else {
        setError("Failed to retrieve token. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <Image src="/images/bg-konser.jpg" alt="bg-login" className="absolute inset-0 z-0 object-cover" fill={true} />
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="absolute top-6 left-6">
        <img src="/images/logo epep.png" alt="Logo" className="w-30 h-10 shadow-md" />
      </div>
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96 z-10">
        <form className="p-6" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold mb-4 text-white opacity-70 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-2">
            <div className="flex items-center py-2 pl-4 bg-white bg-opacity-20 rounded-lg">
              <FontAwesomeIcon icon={faEnvelope} className="text-white mr-1.5 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-transparent rounded-xl border-none w-full placeholder-gray-200 text-white py-1.5 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center py-2 pl-4 bg-white bg-opacity-20 rounded-lg mt-4">
              <FontAwesomeIcon icon={faLock} className="text-white mr-1.5 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent rounded-xl border-none w-full placeholder-gray-200 text-white py-1.5 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <Link href="/forgot-password" className="text-sm text-gray-300 hover:text-white">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="bg-transparent text-white border-2 border-white  hover:bg-white hover:text-black font-bold  py-2 px-4 rounded-full w-full mb-4">
            Login
          </button>
          <div className="text-center">
            <Link href="/register" className="text-sm text-gray-300 hover:text-white">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
