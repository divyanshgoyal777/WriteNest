import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 text-white py-16 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            About WriteNest <i class="fa-solid fa-question"></i>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the platform that empowers writers to share their stories.
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            Our Mission
          </h2>
          <p className="text-lg mb-6">
            WriteNest is a dynamic blogging platform designed to empower writers
            and creators from all walks of life. Our mission is to provide a
            space where you can express your thoughts, share your stories.
          </p>
          <p className="text-lg mb-6">
            At WriteNest, we believe in the power of words and the impact they
            can have on our world. Whether you're a seasoned writer or just
            starting out, our platform offers a user-friendly experience to help
            you publish and promote your content.
          </p>
          <p className="text-lg mb-6">
            Our team is dedicated to constantly improving and expanding our
            features to meet the needs of our users. We are committed to
            providing excellent support and ensuring that WriteNest remains a
            valuable resource for all your blogging needs.
          </p>
          <p className="text-lg mb-6">
            Thank you for being a part of the WriteNest community. We look
            forward to seeing your creativity shine and helping you make your
            mark on the world.
          </p>
          <div className="text-center mt-8">
            <Link to="/payment">
              <button className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                Donate Us<i class="fa-solid fa-circle-dollar-to-slot ml-2"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
