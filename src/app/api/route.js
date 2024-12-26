import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore"; // Mengimpor getDoc
import db from "../../../services/firebase";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const animeCollection = collection(db, "animes");
    const snapshot = await getDocs(animeCollection);
    const animeList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ data: animeList });
  } catch (error) {
    console.error("Error fetching anime list:", error.message);
    return NextResponse.json({ error: "Failed to fetch anime list" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    const imageName = `${Date.now()}-${imageFile.name}`;
    const filePath = `/images/api/${imageName}`;
    const absolutePath = path.join(process.cwd(), "public", filePath);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(absolutePath, buffer);

    const newAnime = { title, description, image: filePath };
    const animeCollection = collection(db, "animes");
    const docRef = await addDoc(animeCollection, newAnime);

    return NextResponse.json({ message: "Anime added", data: { id: docRef.id, ...newAnime } });
  } catch (error) {
    console.error("Error adding anime:", error.message);
    return NextResponse.json({ error: "Failed to add anime" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    const animeDoc = doc(db, "animes", id);
    const updateData = { title, description };

    if (imageFile && imageFile.size > 0) {
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `/images/api/${imageName}`;
      const absolutePath = path.join(process.cwd(), "public", filePath);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(absolutePath, buffer);
      updateData.image = filePath;
    }

    await updateDoc(animeDoc, updateData);
    return NextResponse.json({ message: "Anime updated", data: { id, ...updateData } });
  } catch (error) {
    console.error("Error updating anime:", error.message);
    return NextResponse.json({ error: "Failed to update anime" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const animeDoc = doc(db, "animes", id);

    // Ambil data anime untuk mendapatkan informasi gambar yang akan dihapus
    const animeData = await getDoc(animeDoc);
    const imagePath = animeData.data()?.image; // Ambil gambar

    if (imagePath) {
      const imageFilePath = path.join(process.cwd(), "public", imagePath);
      // Hapus gambar dari disk
      fs.unlinkSync(imageFilePath);
    }

    // Hapus anime dari Firestore
    await deleteDoc(animeDoc);
    return NextResponse.json({ message: "Anime deleted" });
  } catch (error) {
    console.error("Error deleting anime:", error.message);
    return NextResponse.json({ error: "Failed to delete anime" }, { status: 500 });
  }
}
