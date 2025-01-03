"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import EventList from "../tryCatchApi/page";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      console.log("Token yang diterima:", token);
      const decoded = jwt.decode(token);
      setUserData(decoded);
    } catch (error) {
      console.error("Token decoding failed:", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`flex flex-shrink-0 ${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white duration-300 overflow-none`}>
        <div className="flex flex-col items-start justify-between min-h-screen">
          {/* Toggle Button */}
          <button className="p-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "🔙" : "☰"}
          </button>

          {/* Centered Navigation */}
          <div className="flex flex-col flex-grow justify-center space-y-4">
            <Link href="/dashboard">
              <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                <span className="text-2xl">🏠</span>
                {isOpen && <span className="ml-4">Dashboard</span>}
              </p>
            </Link>

            <Link href="/settings">
              <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                <span className="text-2xl">⚙️</span>
                {isOpen && <span className="ml-4">Settings Events</span>}
              </p>
            </Link>
          </div>

          {/* Log Out */}
          <div
            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md mb-12"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            <span className="text-2xl my-2">⬅️</span>
            {isOpen && <span className="ml-4">Log Out</span>}
          </div>

          {/* Footer */}
          {isOpen && (
            <footer className="mb-4 px-4">
              <p className="text-xs">&copy; 2024 ours app</p>
            </footer>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">Welcome Admin</h1>
          <EventList />
        </div>
      </div>
    </div>
  );
}
