"use client";
import React, { useEffect, useState } from "react";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/../../api"); // Endpoint API untuk mendapatkan daftar event
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setEvents(data.data || []); // Gunakan properti data yang sesuai dari API
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = async (event) => {
    const data = {
      id: event.id || `event-${Date.now()}`, // Gunakan ID unik jika kosong
      productName: event.title || "Default Event Title",
      price: event.price || 105000, // Harga dari event
      quantity: 1,
    };

    console.log("Data to Send:", data); // Debugging data sebelum dikirim

    try {
      const response = await fetch("../../api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }

      const { token } = await response.json();
      console.log("Transaction Token:", token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("Payment success:", result);
          window.location.href = "/user?status=success";
        },
        onPending: function (result) {
          console.log("Payment pending:", result);
          window.location.href = "/user?status=pending";
        },
        onError: function (result) {
          console.error("Payment error:", result);
          alert("Terjadi kesalahan dalam pembayaran. Silakan coba lagi.");
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Terjadi kesalahan saat melakukan pembelian. Silakan coba lagi.");
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Events Preview And Purchase</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {event.image ? (
                  <img src={event.image} alt={event.title || "Event Image"} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <p className="mt-2 text-gray-700 font-bold">{event.title || "Untitled Event"}</p>
                  <p className="text-sm text-gray-500 mt-1">{event.date || "No date provided"}</p>
                  <p className="text-sm text-green-600 mt-2 font-bold">Rp{event.price || "Price not available"}</p>
                  <button className=" mt-2 bg-purple-500 px-4 py-2 rounded text-sm font-bold text-white hover:bg-purple-700 " onClick={() => handlePurchase(event)}>
                    Purchase Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
