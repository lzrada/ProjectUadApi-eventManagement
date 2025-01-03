export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">Belum Ada Logo</div>
      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="https://wa.me/6281334215525?text=Hello,%20I%20want%20to%20contact%20you%20regarding%20..."
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
