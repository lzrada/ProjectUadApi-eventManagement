import Image from "next/image";

// components/HeroSection.js
export default function HeroSection() {
    return (
      <section
        className="relative bg-cover bg-center h-[50vh]"
        style={{
          backgroundImage: "url('/images/bg-konser.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Events</h1>
          <p className="mt-2"> {'all events Preview'} </p>
        </div>
      </section>
    );
  }
  