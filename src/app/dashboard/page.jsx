"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`flex ${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white duration-300`}>
          <div className="flex flex-col items-start justify-between h-full">
            <button className="p-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "🔙" : "☰"}
            </button>

            <nav className="flex flex-col mt-4 space-y-4">
              <Link href="/dashboard">
                <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                  <span className="text-2xl active:bg-gray-700">🏠</span>
                  {isOpen && <span className="ml-4">Dashboard</span>}
                </p>
              </Link>
              <Link href="/calendar">
                <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                  <span className="text-2xl">📅</span>
                  {isOpen && <span className="ml-4">Calendar</span>}
                </p>
              </Link>
              <Link href="/settings">
                <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                  <span className="text-2xl">⚙️</span>
                  {isOpen && <span className="ml-4">Settings</span>}
                </p>
              </Link>
              <Link href="/profile">
                <p className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                  <span className="text-2xl">👤</span>
                  {isOpen && <span className="ml-4">Profile</span>}
                </p>
              </Link>
            </nav>

            {isOpen ? (
              <footer className="mb-4 px-4">
                <p className="text-xs">&copy; 2024 ours app</p>
              </footer>
            ) : null}
          </div>
        </div>

        {/* Welcome Admin Section */}
        <div className="flex-1 flex p-4 w-full justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold ">Welcome Admin</h1>
            <div className="w-full flex flex-row"></div>

            <p className="text-sm bg-gray-200 w-23 h-screen p-4 rounded-lg m-2 ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis autem dolor, nesciunt odio saepe provident magni. Voluptatem porro mollitia non error temporibus autem iure. Deleniti, blanditiis sequi? Quisquam, ad labore?
            </p>
          </div>
        </div>
      </div>
      {/* Carousel */}
      <div className="">
        <div className="carousel carousel-center rounded-box flex flex-row overflow-y-hidden space-x-4  overflow-x-scroll">
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" className="rounded-lg" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Pizza" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Pizza" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Pizza" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Pizza" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Pizza" />
          </div>
          <div className="carousel-item min-w-[200px] h-64">
            <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Pizza" />
          </div>
        </div>
      </div>
    </>
  );
}
