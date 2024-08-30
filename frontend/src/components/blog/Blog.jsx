import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs");
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogPosts(sortedBlogs);
        setFilteredPosts(sortedBlogs);
      } catch (error) {
        setError("Failed to fetch blog posts");
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredPosts(blogPosts);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredPosts(
        blogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.summary.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  }, [searchQuery, blogPosts]);

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <div className="p-4">
          <div className="bg-gradient-to-r from-red-500 via-pink-400 to-blue-500 text-white p-10 text-center">
            <h1 className="text-5xl font-bold">Blogs</h1>
            <Link to="/createblog">
              <button className="mt-6 bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gradient-to-r from-red-500 to-pink-600">
                <i className="fa-solid fa-pen mr-2"></i>Create Blogs
              </button>
            </Link>
            <div className="mt-6 flex justify-center">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md p-3 border text-black border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto py-3 px-2">
          {error && <p className="text-red-500">{error}</p>}
          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-700">
              No blogs found according to your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {highlightText(post.title, searchQuery)}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {highlightText(post.summary, searchQuery)}
                  </p>
                  <Link
                    to={`/blog/${post._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
