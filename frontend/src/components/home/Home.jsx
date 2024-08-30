import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/home/blogs?limit=3"
        );
        setLatestBlogs(response.data);
        toast.success("Latest blogs loaded successfully!");
      } catch (error) {
        setError("Failed to fetch latest blog posts");
        toast.error("Failed to load latest blogs");
        console.error(error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const faqs = [
    {
      question: "What is WriteNest?",
      answer:
        "WriteNest is a platform for bloggers and readers to share, discover, and enjoy each other's blogs. Whether you're a tech enthusiast, a lifestyle blogger, or just someone who loves to write, WriteNest has something for you.",
    },
    {
      question: "How do I create a blog on WriteNest?",
      answer:
        "You can create a blog by signing up for an account, navigating to the 'Create Blogs' page, and filling out the form with your content. Once submitted, your blog will be live for others to read.",
    },
    {
      question: "Is WriteNest free to use?",
      answer:
        "Yes, WriteNest is completely free to use. You can sign up, read blogs, and create your own content without any charges.",
    },
    {
      question: "Can I edit or delete my blog posts?",
      answer:
        "Yes, you can edit or delete your blog posts at any time by going to your profile and selecting the blog you wish to modify.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-10 text-center">
            <h1 className="text-5xl font-bold">Welcome to WriteNest</h1>
            <p className="text-xl mt-4">
              Your platform to share and explore amazing blogs
            </p>
            <div className="flex font-semibold justify-center items-center gap-2">
              <Link to={"/blog"}>
                <button className="mt-6 bg-white text-black py-2 px-4 rounded hover:bg-gradient-to-r from-purple-500 to-red-500">
                  <i className="fa-solid fa-magnifying-glass mr-2"></i>Explore
                  Blogs
                </button>
              </Link>
              <Link to={"/createblog"}>
                <button className="mt-6 bg-white text-black py-2 px-4 rounded hover:bg-gradient-to-r from-red-500 to-purple-500">
                  <i className="fa-solid fa-pen mr-2"></i>Create Blogs
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 p-8 mt-6">
            <h2 className="text-3xl font-bold mb-4">About WriteNest</h2>
            <p>
              WriteNest is a platform for bloggers and readers to share,
              discover, and enjoy each other's blogs. Whether you're a tech
              enthusiast, a lifestyle blogger, or just someone who loves to
              write, WriteNest has something for you.
            </p>
          </div>
          <div className="p-4 mt-4">
            <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.summary}</p>
                  <Link
                    to={`/blog/${post._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white py-16 px-8">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600">
                    {faq.question}
                  </h3>
                  <p className="text-lg text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
