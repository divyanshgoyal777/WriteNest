import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <div
      className={`fixed top-0 left-0 h-full bg-[#18181b] text-white font-semibold w-64 space-y-6 py-7 px-2 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="flex items-center justify-between">
        <img src={logo} className="ml-4" width={60} alt="Logo" />
        <i
          onClick={onClose}
          className="text-2xl fa-solid mr-4 fa-xmark hover:bg-[#323236] hover:cursor-pointer p-3 rounded"
        ></i>
      </div>
      <nav>
        <Link
          to="/"
          className={`block py-3 mb-1 px-4 rounded transition duration-200 ${
            location.pathname === "/" ? "bg-[#323236]" : "hover:bg-[#323236]"
          }`}
          onClick={onClose}
        >
          <i class="fa-solid fa-house mr-2"></i>
          Home
        </Link>
        <Link
          to="/blog"
          className={`block py-3 mb-1 px-4 rounded transition duration-200 ${
            location.pathname === "/blog"
              ? "bg-[#323236]"
              : "hover:bg-[#323236]"
          }`}
          onClick={onClose}
        >
          <i class="fa-solid fa-blog mr-2"></i>
          Blogs
        </Link>
        <Link
          to="/about"
          className={`block py-3 mb-1 px-4 rounded transition duration-200 ${
            location.pathname === "/about"
              ? "bg-[#323236]"
              : "hover:bg-[#323236]"
          }`}
          onClick={onClose}
        >
          <i class="fa-solid fa-circle-info mr-2"></i>
          About
        </Link>
        <Link
          to="/contact"
          className={`block py-3 mb-1 px-4 rounded transition duration-200 ${
            location.pathname === "/contact"
              ? "bg-[#323236]"
              : "hover:bg-[#323236]"
          }`}
          onClick={onClose}
        >
          <i class="fa-solid fa-phone mr-2"></i>
          Contact
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            className={`block py-3 mb-1 w-full text-left px-4 rounded transition duration-200 ${
              location.pathname.includes("/profile")
                ? "bg-[#323236]"
                : "hover:bg-[#323236]"
            }`}
            onClick={handleDropdownToggle}
          >
            <i class="fa-solid fa-user mr-2"></i>
            Profile
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#343435] text-white rounded-md shadow-lg">
              <Link
                to="/profile"
                className={`block py-3 px-4 rounded ${
                  location.pathname === "/profile"
                    ? "bg-[#4c4c4d]"
                    : "hover:bg-[#484849]"
                }`}
                onClick={onClose}
              >
                <i class="fa-solid fa-eye mr-2"></i>
                View Profile
              </Link>
              <Link
                to="/createblog"
                className={`block py-3 px-4 rounded ${
                  location.pathname === "/createblog"
                    ? "bg-[#4c4c4d]"
                    : "hover:bg-[#484849]"
                }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                <i class="fa-solid fa-pen mr-2"></i>
                Create Blogs
              </Link>
              <Link
                to="/manageblog"
                className={`block py-3 px-4 rounded ${
                  location.pathname === "/manageblog"
                    ? "bg-[#4c4c4d]"
                    : "hover:bg-[#484849]"
                }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                <i class="fa-solid fa-list-check mr-2"></i>
                Manage Blogs
              </Link>
              <button
                className="block px-4 py-3 text-left w-full hover:bg-[#484849] rounded"
                onClick={handleLogout}
              >
                <i class="fa-solid fa-right-from-bracket mr-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
