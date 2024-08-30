import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#18181b] shadow-lg sticky top-0 z-200 p-2">
      <div className="container text-white mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          <Link to="/">
            <img src={logo} width={60} alt="WriteNest" />
          </Link>
        </div>
        <div className="hidden md:flex font-semibold space-x-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded ${
              location.pathname === "/" ? "bg-[#323236]" : "hover:bg-[#323236]"
            }`}
          >
            <i class="fa-solid fa-house mr-2"></i>
            Home
          </Link>
          <Link
            to="/blog"
            className={`px-3 py-2 rounded ${
              location.pathname === "/blog"
                ? "bg-[#323236]"
                : "hover:bg-[#323236]"
            }`}
          >
            <i class="fa-solid fa-blog mr-2"></i>
            Blogs
          </Link>
          <Link
            to="/about"
            className={`px-3 py-2 rounded ${
              location.pathname === "/about"
                ? "bg-[#323236]"
                : "hover:bg-[#323236]"
            }`}
          >
            <i class="fa-solid fa-circle-info mr-2"></i>
            About
          </Link>
          <Link
            to="/contact"
            className={`px-3 py-2 rounded ${
              location.pathname === "/contact"
                ? "bg-[#323236]"
                : "hover:bg-[#323236]"
            }`}
          >
            <i class="fa-solid fa-phone mr-2"></i>
            Contact
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="px-3 py-2 rounded hover:bg-[#323236]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i class="fa-solid fa-user mr-2"></i>
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#343435] text-white rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className={`block px-4 py-3 rounded ${
                    location.pathname === "/profile"
                      ? "bg-[#4d4c4c]"
                      : "hover:bg-[#56565a]"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i class="fa-solid fa-eye mr-2"></i>
                  View Profile
                </Link>
                <Link
                  to="/createblog"
                  className={`block px-4 py-3 rounded ${
                    location.pathname === "/createblog"
                      ? "bg-[#4d4c4c]"
                      : "hover:bg-[#56565a]"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i class="fa-solid fa-pen mr-2"></i>
                  Create Blogs
                </Link>
                <Link
                  to="/manageblog"
                  className={`block px-4 py-3 rounded ${
                    location.pathname === "/manageblog"
                      ? "bg-[#4d4c4c]"
                      : "hover:bg-[#56565a]"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <i class="fa-solid fa-list-check mr-2"></i>
                  Manage Blogs
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-3 text-left w-full hover:bg-[#484849] rounded"
                >
                  <i class="fa-solid fa-right-from-bracket mr-2"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;
