import React, { useState } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar/Navbar";
import Sidebar from "../layout/Sidebar/Sidebar";
import Footer from "../layout/Footer/Footer";
import { toast } from "react-hot-toast"; 

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} />
      <div className="p-4">
        <div className="bg-gradient-to-r from-violet-600 via-blue-500 to-violet-500 text-white py-16 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <i className="fa-solid fa-phone mr-2"></i>Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Contact with us by filling this form. We will respond to you soon.
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name<i className="fa-solid fa-signature ml-2"></i>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email<i className="fa-solid fa-envelope ml-2"></i>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message<i className="fa-solid fa-message ml-2"></i>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Send Message<i className="fa-solid fa-paper-plane ml-2"></i>
            </button>

            {status && (
              <p className="text-center mt-4 text-blue-600">{status}</p>
            )}
          </form>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600">My Portfolio:</p>
            <p className="text-blue-500 font-bold text-xl">
              <a target="_blank" href="https://portfolioofdivyansh.netlify.app">
                Portfolio<i className="fa-solid fa-briefcase ml-2"></i>
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
