"use client";
import { useEffect, useState } from "react";

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    // Fetch data dari API lokal
    const fetchData = async () => {
      const res = await fetch("/api");
      const data = await res.json();
      setAnimeList(data.data); // Sesuaikan dengan struktur data API Anda
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Daftar Anime</h1>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            <h2 className="text-lg font-bold ">{anime.title}</h2>
            <p className="font-lg text-blue-600">{anime.description}</p>
            <img src={anime.image} alt={anime.title} width={300} />
          </li>
        ))}
      </ul>
    </div>
  );
}
