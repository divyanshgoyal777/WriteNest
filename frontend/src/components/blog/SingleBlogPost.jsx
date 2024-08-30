import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const SingleBlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/${id}`
        );
        if (response.data) {
          setBlog(response.data);
          toast.success("Blog post found!");
        } else {
          toast.error("Blog post not found!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Blog post not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-lg font-semibold py-8">Loading...</div>
    );

  const shareUrl = window.location.href;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        {blog ? (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-col mb-6">
              <p className="text-gray-600 text-sm">
                By <span className="font-semibold">{blog.author.name}</span>
              </p>
              <p className="text-gray-600 text-sm">
                On{" "}
                <span className="font-semibold">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </p>
              <div className="flex gap-4 mt-2">
                <p className="text-gray-600 text-sm flex items-center">
                  <i className="fa-solid fa-share mr-2"></i>Share this blog
                </p>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareUrl
                  )}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <i className="fa-brands fa-twitter"></i> Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <i className="fa-brands fa-facebook"></i> Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    shareUrl
                  )}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  <i className="fa-brands fa-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{blog.summary}</p>
            <div
              className="prose prose-lg blog-content text-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">
            No blog post available.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SingleBlogPost;
