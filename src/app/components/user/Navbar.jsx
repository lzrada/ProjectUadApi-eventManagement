// components/Navbar.js
export default function Navbar() {
    return (
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Belum Ada Logo</div>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-gray-400">Home</a></li>
          <li><a href="#" className="hover:text-gray-400">Pages</a></li>
          <li><a href="#" className="hover:text-gray-400">Events</a></li>
          <li><a href="#" className="hover:text-gray-400">Speakers</a></li>
          <li><a href="#" className="hover:text-gray-400">Blog</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
        </ul>      
      </nav>
    );
  }
  