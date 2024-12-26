/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api", // URL API yang dipanggil dari frontend
        destination: "/api", // Tetap di server lokal (tidak diubah)
      },
    ];
  },

  // Konfigurasi untuk optimasi gambar
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // Domain localhost agar gambar di `/public/images/api` dapat digunakan
        port: "",
        pathname: "public/images/api/**",
      },
    ],
  },

  // Pengaturan lainnya
  reactStrictMode: true, // Aktifkan mode strict untuk debugging
};

export default nextConfig;
