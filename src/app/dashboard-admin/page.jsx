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
      

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col items-center">
          <div className="flex w-full items-center">
            <h1 className="text-xl ml-auto font-semibold">Welcome Admin</h1>
            <button
              className="bg-red-500 text-white p-4 py-2 rounded ml-auto"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>

          <EventList />
        </div>
      </div>
    </div>
  );
}
