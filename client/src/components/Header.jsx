import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../logo.png"; // Import your logo image here

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []); // Removed location.search from the dependency array

  return (
    <header className="bg-gradient-to-r from-gray-300 to-gray-400 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-3 space-y-3 sm:space-y-0">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16 sm:h-24" />
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg flex items-center w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none flex-grow text-gray-800 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-gray-600" />
          </button>
        </form>
        <ul className="flex gap-12 sm:gap-8">
          <li>
            <Link to="/" className="text-gray-800 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-800 hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/clients" className="text-gray-800 hover:text-gray-900">
              Clients
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-800 hover:text-gray-900">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                "Sign in"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
