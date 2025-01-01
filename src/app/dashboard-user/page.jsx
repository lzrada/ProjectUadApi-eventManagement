"use client";
import { useEffect } from "react";
import Navbar from "../components/user/Navbar";
import HeroSection from "../components/user/HeroSection.jsx";
import EventsSection from "../components/user/EventsSection.jsx";
import Footer from "../components/user/Footer.jsx";

export default function Home() {
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

  return (
    <>
      <Navbar />
      <HeroSection />
      <EventsSection />
      <Footer />
    </>
  );
}
