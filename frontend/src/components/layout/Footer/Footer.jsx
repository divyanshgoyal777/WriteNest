import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#18181b] text-white py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <Link to="/">
            <img src={logo} alt="WriteWave" width={60} />
          </Link>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/blog" className="hover:text-gray-400">
            Blogs
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
          <Link to="/profile" className="hover:text-gray-400">
            Profile
          </Link>
        </div>

        <div className="flex space-x-4 mb-3 md:mb-0">
          <a
            href="https://www.linkedin.com/in/divyanshgoyal777/"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/divyanshgoyal777"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/divyanshgoyal777/"
            target="_blank"
            className="hover:text-gray-400"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400">
        © 2024 WriteNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
