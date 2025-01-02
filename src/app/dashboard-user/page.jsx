"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/user/Navbar";
import HeroSection from "../components/user/HeroSection.jsx";
import EventsSection from "../components/user/EventsSection.jsx";
import Footer from "../components/user/Footer.jsx";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // Tambahkan script Snap Midtrans
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT; // Pastikan ini didefinisikan di .env
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    // Hapus script saat komponen dilepas
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      console.log("Token yang diterima:", token); // Log token untuk debugging
      const decoded = jwt.decode(token); // Decode token tanpa verifikasi secret
      setUserData(decoded); // Simpan data pengguna dari token
    } catch (error) {
      console.error("Token decoding failed:", error); // Debugging
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <EventsSection />
      <Footer />
    </>
  );
}
