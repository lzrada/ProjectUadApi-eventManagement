"use client";
import { useState } from "react";
import db from "../../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SaveData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Menambahkan data ke koleksi 'users'
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        createdAt: new Date(),
      });
      alert(`Data berhasil disimpan! ID Dokumen: ${docRef.id}`);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error menyimpan data: ", error);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div>
      <h1>Form Simpan Data ke Firebase</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
