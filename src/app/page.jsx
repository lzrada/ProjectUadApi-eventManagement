"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk memantau status loading

  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchData = async () => {
      try {
        const response = await fetch("/api"); // Pastikan endpoint API sesuai
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setEventList(data.data); // Pastikan properti 'data' sesuai respons API Anda
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Hentikan loading setelah selesai fetch
      }
    };

    fetchData();
  }, []);

  const handleScroll = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <section className="flex-1 flex items-center justify-center text-white bg-cover bg-center relative" style={{ backgroundImage: "url('/images/bg-konser.jpg')" }}>
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="text-center p-8 z-10 relative">
            <h2 className="text-4xl font-bold mb-4">Welcome</h2>
            <p className="text-lg mb-6">By pressing the button below, you will be immediately directed to the login page!</p>
            <Link className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-white hover:text-blue-500 transition-colors" href="/login">
              Get Started
            </Link>
          </div>
          <div className="absolute top-6 left-6">
            <img src="/images/logo epep.png" alt="Logo" className="w-30 h-10 shadow-md" />
          </div>
          <div className="absolute bottom-6 w-full text-center z-10">
            <button onClick={handleScroll} className="bg-white text-blue-600 p-3 rounded-full shadow-md hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>
      </div>

      <div id="next-section" className="h-screen bg-white w-full px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">Event List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {eventList.map((event) => (
              <li key={event.id} className="bg-gray-100 p-4 rounded shadow">
                <img src={event.image || "/placeholder.png"} alt={event.title || "Default Placeholder"} className="w-full h-48 object-cover mb-2 rounded" />
                <p className="mt-2 text-gray-700 font-bold">{event.title || "Untitled Event"}</p>
                <p className="mt-2 text-gray-700 ">{event.description || "Untitled description"}</p>
                <div className="mt-2 grid grid-cols-2 items-center">
                  <p className="text-sm text-gray-500 mt-1">{event.date || "No date provided"}</p>
                  <p className="text-sm text-green-600 ml-14 mt-2 font-bold">Rp{event.price || "Price not available"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Alamat Perusahaan */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Address</h5>
            <p className="text-sm text-gray-300">
              <a href="https://maps.app.goo.gl/BP4t3vgqKNjZhJ9D7" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline">
                Jl. Majapahit No.2- 4, Sananwetan, <br />
                Kec. Sananwetan, Kota Blitar, <br />
                Jawa Timur 66137
              </a>
            </p>
          </div>

          {/* Kontak Perusahaan */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Contact</h5>
            <p className="text-sm text-gray-300">
              Telephone:{" "}
              <a href="tel:+62123456789" className="hover:underline">
                +62 123 456 789
              </a>
              <br />
              Email:{" "}
              <a href="mailto:info@perusahaan.com" className="hover:underline">
                info@perusahaan.com
              </a>
            </p>
          </div>

          {/* Media Sosial */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Social Media</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <img src="/icons/facebook.png" alt="Facebook" className="w-20 " />
              </a>
              <a href="https://www.instagram.com/adeee_ptra/profilecard/?igsh=MTR3eGJybXpudDB2cA==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                <img src="/icons/instagram.png" alt="Instagram" className="w-20" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <img src="/icons/twitter.png" alt="Twitter" className="w-20" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
