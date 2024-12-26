"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState({ title: "", description: "", image: null });
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
    setAnimeList(data.data);
  };

  const handleAddAnime = async () => {
    // Validasi input sebelum melanjutkan
    if (!newAnime.title || !newAnime.description || !newAnime.image) {
      setError("Judul, deskripsi, dan gambar tidak boleh kosong!");
      return;
    }

    // Clear error message
    setError("");

    const formData = new FormData();
    formData.append("title", newAnime.title);
    formData.append("description", newAnime.description);
    formData.append("image", newAnime.image);

    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setAnimeList((prev) => [...prev, result.data]);
      setNewAnime({ title: "", description: "", image: null }); // Reset form data
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } else {
      setError("Gagal menambahkan anime. Coba lagi.");
    }
  };

  const handleUpdateAnime = async (id) => {
    const animeToUpdate = animeList.find((anime) => anime.id === id);
    const updatedTitle = prompt("Update title", animeToUpdate.title);
    const updatedDescription = prompt("Update description", animeToUpdate.description);

    if (updatedTitle && updatedDescription) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", updatedTitle);
      formData.append("description", updatedDescription);

      setIsUpdating(true);

      // Debounce logic
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
          setAnimeList((prev) => prev.map((anime) => (anime.id === id ? result.data : anime)));
        }
      }, 300); // Delay 300ms

      setDebounceTimeout(timeout);
    }
  };

  const handleDeleteAnime = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this anime?");
    if (confirmDelete) {
      const res = await fetch("/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setAnimeList((prev) => prev.filter((anime) => anime.id !== id));
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 m-5">Daftar Anime</h1>
      <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4 my-2">
        {animeList.map((anime) => (
          <li key={anime.id} className="mb-4">
            <Image src={anime.image || "/placeholder.png"} alt={anime.title} width={300} height={300} className="w-full h-64 object-cover" />
            <h2 className="text-lg font-bold">{anime.title}</h2>
            <p className="font-lg text-blue-600">{anime.description}</p>
            <button onClick={() => handleUpdateAnime(anime.id)} className={`bg-yellow-500 text-white px-2 py-1 mt-2 rounded ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </button>
            <button onClick={() => handleDeleteAnime(anime.id)} className="bg-red-500 text-white px-2 py-1 mt-2 ml-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-2">Add New Anime</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        <input type="text" placeholder="Title" value={newAnime.title} onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })} className="border p-2 mr-2" />
        <input type="text" placeholder="Description" value={newAnime.description} onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })} className="border p-2 mr-2" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewAnime({ ...newAnime, image: e.target.files[0] })}
          className="border p-2 mr-2"
          ref={fileInputRef} // Attach ref to input
        />
        <button onClick={handleAddAnime} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Anime
        </button>
      </div>
    </div>
  );
}
