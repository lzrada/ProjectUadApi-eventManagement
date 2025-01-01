import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import db from "../../../services/firebase";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const eventCollection = collection(db, "events");
    const snapshot = await getDocs(eventCollection);
    const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ data: eventList });
  } catch (error) {
    console.error("Error fetching event list:", error.message);
    return NextResponse.json({ error: "Failed to fetch event list" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date"); // Menambahkan tanggal
    const price = parseFloat(formData.get("price")); // Menambahkan harga
    const imageFile = formData.get("image");

    // Validasi
    if (!title || !description || !date || !price || !imageFile) {
      throw new Error("Missing required fields");
    }

    const imageName = `${Date.now()}-${imageFile.name}`;
    const filePath = `/images/api/${imageName}`;
    const absolutePath = path.join(process.cwd(), "public", filePath);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(absolutePath, buffer);

    const newEvent = { title, description, date, price, image: filePath };
    const eventCollection = collection(db, "events");
    const docRef = await addDoc(eventCollection, newEvent);

    return NextResponse.json({ message: "Event added", data: { id: docRef.id, ...newEvent } });
  } catch (error) {
    console.error("Error adding event:", error.message);
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date"); // Menambahkan tanggal
    const price = parseFloat(formData.get("price")); // Menambahkan harga
    const imageFile = formData.get("image");

    const eventDoc = doc(db, "events", id);
    const updateData = { title, description, date, price };

    if (imageFile && imageFile.size > 0) {
      const imageName = `${Date.now()}-${imageFile.name}`;
      const filePath = `/images/api/${imageName}`;
      const absolutePath = path.join(process.cwd(), "public", filePath);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(absolutePath, buffer);
      updateData.image = filePath;
    }

    await updateDoc(eventDoc, updateData);
    return NextResponse.json({ message: "Event updated", data: { id, ...updateData } });
  } catch (error) {
    console.error("Error updating event:", error.message);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const eventDoc = doc(db, "events", id);

    const eventData = await getDoc(eventDoc);
    const imagePath = eventData.data()?.image;

    if (imagePath) {
      const imageFilePath = path.join(process.cwd(), "public", imagePath);
      fs.unlinkSync(imageFilePath);
    }

    await deleteDoc(eventDoc);
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
