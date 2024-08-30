import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/userblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        toast.error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setTitle(blog.title);
    setSummary(blog.summary);
    setContent(blog.content);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/userblogs/${editBlog._id}`,
        {
          title,
          summary,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(
        blogs.map((b) =>
          b._id === response.data.blog._id ? response.data.blog : b
        )
      );
      setEditBlog(null);
      setTitle("");
      setSummary("");
      setContent("");
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/userblogs/${blogToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== blogToDelete));
      setShowDeleteConfirm(false);
      setBlogToDelete(null);
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <Toaster />
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          <i className="fa-solid fa-list-check mr-2"></i>Manage Your Blogs
        </h1>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            You have no blogs.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{blog.summary}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                    >
                      <i className="fa-solid fa-pen mr-2"></i>Edit
                    </button>
                    <button
                      onClick={() => {
                        setBlogToDelete(blog._id);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                    >
                      <i className="fa-solid fa-trash mr-2"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editBlog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95vw] h-[95vh]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                <i className="fa-solid fa-pen mr-2"></i>Edit Blog
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Content
                </label>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
                  modules={modules}
                  className="md:h-64 h-72"
                />
              </div>
              <div className="flex gap-2 lg:mt-20 md:mt-20 sm:mt-28 mt-40">
                <button
                  onClick={handleUpdate}
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                  <i className="fa-solid fa-upload mr-2"></i>Update Blog
                </button>
                <button
                  onClick={() => setEditBlog(null)}
                  className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                  <i className="fa-solid fa-xmark mr-2"></i>Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                <i className="fa-solid fa-trash mr-2"></i>Confirm Delete
              </h2>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this blog? This action cannot be
                undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                >
                  <i className="fa-solid fa-check mr-2"></i>Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                  <i className="fa-solid fa-xmark mr-2"></i>Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ManageBlog;
