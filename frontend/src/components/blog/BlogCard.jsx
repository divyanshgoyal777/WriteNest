import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ConfirmationModal from "./ConfirmationModal";

const BlogCard = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show modal when submitting
  };

  const handleConfirm = async () => {
    setIsModalOpen(false); // Close the modal
    if (!title.trim() || !summary.trim() || !content.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        { title, summary, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success("Blog post created successfully!");
        setTitle("");
        setSummary("");
        setContent("");
      }
    } catch (error) {
      toast.error("Failed to create blog post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      ["clean"],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: "1" }, { header: "2" }, { header: "3" }],
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-4 md:p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            <i className="fa-solid fa-pen mr-2"></i>Create a New Blog Post
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the title of your blog post"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Summary
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter a brief summary of your blog post"
                required
              />
            </div>
            <div className="md:mb-24 sm:mb-36 mb-52">
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                modules={modules}
                className="h-80 mb-16"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
                disabled={loading}
              >
                <i className="fa-solid fa-upload mr-2"></i>
                {loading ? "Publishing..." : "Publish Blog Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default BlogCard;