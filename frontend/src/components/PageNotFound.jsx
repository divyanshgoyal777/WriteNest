import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-lg mb-6">
          Sorry, the page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center text-blue-500 hover:text-blue-700 text-lg font-medium"
          >
            <FaHome className="mr-2 text-xl" />
            Go to Home
          </Link>
          <Link
            to="/about"
            className="flex items-center text-blue-500 hover:text-blue-700 text-lg font-medium"
          >
            <FaArrowLeft className="mr-2 text-xl" />
            Back to About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
