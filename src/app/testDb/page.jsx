"use client";
import { useState } from "react";
import db from "../../../services/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function SaveData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fungsi untuk mengecek apakah email sudah ada di Firestore
  const checkEmailExists = async (email) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      // Jika querySnapshot ada isinya, berarti email sudah terdaftar
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error mengecek email: ", error);
      throw new Error("Gagal memeriksa email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mengecek apakah nama dan email sudah diisi
    if (!name || !email) {
      return alert("Nama dan Email harus diisi!");
    }

    // Mengecek apakah email sudah ada dalam database
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      return alert("Email sudah digunakan, silakan gunakan email lain.");
    }

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
