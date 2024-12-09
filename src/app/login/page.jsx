"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { loginWithEmailAndPassword } from "../../../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailAndPassword(email, password);
      console.log("Logged in user:", user);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/bg-login.jpg" alt="bg-login" className="bg-image" fill={true} />
      <div className="bg-white p-0 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <Image src="/images/bg-login.jpg" alt="image-login" width={800} height={800} className="object-cover w-full h-48 rounded-t-lg" />
        </div>
        <form className="p-6" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-2">
            <div className="flex items-center py-2">
              <FontAwesomeIcon icon={faUser} className="text-pink-500 mr-2 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none bg-pink-500 rounded-xl border-none w-full placeholder-white text-white mr-3 py-1.5 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center py-2">
              <FontAwesomeIcon icon={faKey} className="text-pink-500 mr-1.5 fa-sm" style={{ fontSize: 20, width: 20 }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-pink-500 rounded-xl border-none w-full text-white placeholder-white mr-3 py-1.5 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-start mb-4">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
            Login
          </button>
          <div className="text-center">
            <Link href="/register" className="text-sm text-gray-600 hover:text-gray-800">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
