import { NextResponse } from "next/server";
export async function GET() {
  const animeData = [
    {
      id: 1,
      title: "Attack on Titan",
      description: "Humanity fights against Titans to survive.",
      image: "/images/api/cek1.jpg", // URL gambar
    },
    {
      id: 2,
      title: "Naruto",
      description: "The story of a ninja striving to become Hokage.",
      image: "/images/api/cek2.jpg", // URL gambar
    },
  ];

  return NextResponse.json({ data: animeData });
}
