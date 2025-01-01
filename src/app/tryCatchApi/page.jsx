"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: null,
    date: "", // Menambahkan inisialisasi untuk date
    price: "", // Menambahkan inisialisasi untuk price
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    setEventList(data.data);
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.image) {
      setError("Judul, deskripsi, dan gambar tidak boleh kosong!");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    formData.append("image", newEvent.image);
    formData.append("date", newEvent.date);
    formData.append("price", newEvent.price);

    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setEventList((prev) => [...prev, result.data]);
      setNewEvent({ title: "", description: "", image: null, date: "", price: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError("Gagal menambahkan event. Coba lagi.");
    }
  };

  const handleUpdateEvent = async () => {
    if (!updateEvent.title || !updateEvent.description) {
      setError("Judul dan deskripsi tidak boleh kosong!");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("id", updateEvent.id);
    formData.append("title", updateEvent.title);
    formData.append("description", updateEvent.description);
    formData.append("date", updateEvent.date); // Menambahkan tanggal
    formData.append("price", updateEvent.price); // Menambahkan harga

    if (updateEvent.image) {
      formData.append("image", updateEvent.image);
    }

    const res = await fetch("/api", {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setEventList((prev) => prev.map((event) => (event.id === updateEvent.id ? result.data : event)));
      setUpdateEvent(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError("Gagal memperbarui event. Coba lagi.");
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus event ini?");
    if (confirmDelete) {
      const res = await fetch("/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setEventList((prev) => prev.filter((event) => event.id !== id));
      }
    }
  };

  const handleEditClick = (event) => {
    setUpdateEvent({ id: event.id, title: event.title, description: event.description, date: event.date, price: event.price, image: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 m-5">Daftar Event</h1>
      <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4 my-2">
        {eventList.map((event) => (
          <li key={event.id} className="mb-4">
            <Image src={event.image || "/placeholder.png"} alt={event.title || "Placeholder"} width={300} height={300} className="w-full h-64 object-cover" />
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p className="font-lg text-blue-600">{event.description}</p>
            <p className="text-sm font-medium text-gray-700">{event.date}</p> {/* Tampilkan Tanggal */}
            <p className="font-bold text-green-600">Rp{event.price}</p> {/* Tampilkan Harga */}
            <button onClick={() => handleEditClick(event)} className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded">
              Edit
            </button>
            <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white px-2 py-1 mt-2 ml-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {updateEvent && (
        <div className="border p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Update Event</h2>
          <input type="text" placeholder="Judul" value={updateEvent.title} onChange={(e) => setUpdateEvent({ ...updateEvent, title: e.target.value })} className="border w-full p-2 mb-2" />
          <textarea placeholder="Deskripsi" value={updateEvent.description} onChange={(e) => setUpdateEvent({ ...updateEvent, description: e.target.value })} className="border w-full p-2 mb-2" />
          <input type="file" ref={fileInputRef} onChange={(e) => setUpdateEvent({ ...updateEvent, image: e.target.files[0] })} className="border w-full p-2 mb-2" />
          {error && <p className="text-red-500">{error}</p>}
          <button onClick={handleUpdateEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Event
          </button>
          <button onClick={() => setUpdateEvent(null)} className="bg-gray-500 text-white px-4 py-2 ml-2 rounded">
            Cancel
          </button>
        </div>
      )}

      <div className="border p-4 mt-4">
        <h2 className="text-xl font-bold mb-4">Tambahkan Event Baru</h2>
        <input type="text" placeholder="Judul" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="border w-full p-2 mb-2" />
        <textarea placeholder="Deskripsi" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border w-full p-2 mb-2" />
        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="border w-full p-2 mb-2" />
        <input type="number" placeholder="Harga" value={newEvent.price} onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })} className="border w-full p-2 mb-2" />
        <input type="file" ref={fileInputRef} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })} className="border w-full p-2 mb-2" />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Event
        </button>
      </div>
    </div>
  );
}
