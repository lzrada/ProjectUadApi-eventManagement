"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", image: null });
  const [isUpdating, setIsUpdating] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [error, setError] = useState(""); // State for error message
  const fileInputRef = useRef(null); // Create a ref for the file input

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
      setError("Title, description, and image cannot be empty!");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    formData.append("image", newEvent.image);

    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setEventList((prev) => [...prev, result.data]);
      setNewEvent({ title: "", description: "", image: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError("Failed to add event. Try again.");
    }
  };

  const handleUpdateEvent = async (id) => {
    const eventToUpdate = eventList.find((event) => event.id === id);
    const updatedTitle = prompt("Update title", eventToUpdate.title);
    const updatedDescription = prompt("Update description", eventToUpdate.description);

    if (updatedTitle && updatedDescription) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", updatedTitle);
      formData.append("description", updatedDescription);

      const newImage = window.confirm("Do you want to update the image?");
      if (newImage) {
        const imageFile = await selectFile(); // Prompt file selection
        if (imageFile) {
          formData.append("image", imageFile);
        }
      }

      setIsUpdating(true);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(async () => {
        const res = await fetch("/api", {
          method: "PUT",
          body: formData,
        });

        setIsUpdating(false);

        if (res.ok) {
          const result = await res.json();
          setEventList((prev) => prev.map((event) => (event.id === id ? result.data : event)));
        }
      }, 300);

      setDebounceTimeout(timeout);
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
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

  const selectFile = () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => resolve(e.target.files[0]);
      input.click();
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 m-5">Event List</h1>
      <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4 my-2">
        {eventList.map((event) => (
          <li key={event.id} className="mb-4">
            <Image src={event.image || "/placeholder.png"} alt={event.title || "Default Placeholder"} width={300} height={300} className="w-full h-64 object-cover" />
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p className="font-lg text-blue-600">{event.description}</p>
            <button onClick={() => handleUpdateEvent(event.id)} className={`bg-yellow-500 text-white px-2 py-1 mt-2 rounded ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </button>
            <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white px-2 py-1 mt-2 ml-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="border p-4">
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
        <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="border w-full p-2 mb-2" />
        <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border w-full p-2 mb-2" />
        <input type="file" ref={fileInputRef} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })} className="border w-full p-2 mb-2" />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Event
        </button>
      </div>
    </div>
  );
}
