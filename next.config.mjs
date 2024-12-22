/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/anime", // URL API yang dipanggil dari frontend
        destination: "/api/anime", // Tetap di server lokal (tidak diubah)
      },
    ];
  },

  // Konfigurasi untuk optimasi gambar
  images: {
    domains: ["localhost"], // Domain localhost agar gambar di `/public/images/api` dapat digunakan
  },

  // Pengaturan lainnya
  reactStrictMode: true, // Aktifkan mode strict untuk debugging
  swcMinify: true,
};

export default nextConfig;
