import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("http://localhost:3000/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
      toast.error("Failed to update profile");
    }
  };

  const handleCancelClick = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <div className="bg-gradient-to-r from-green-600 via-teal-600 to-green-500 text-white py-16 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <i className="fa-solid fa-user mr-2"></i>Profile
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the platform that empowers writers to share their stories.
          </p>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-8">
        <Toaster />
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
            <i className="fa-solid fa-user mr-2"></i>Profile
          </h1>
          <div className="mb-8 bg-teal-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700">
              User Details
            </h2>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-medium">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSaveClick}
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                  >
                    Save<i className="fa-solid fa-floppy-disk ml-2"></i>
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="ml-4 bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                  >
                    Cancel<i className="fa-solid fa-xmark ml-2"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-lg font-medium text-gray-700">
                  <strong>Name:</strong> {userData.name}
                </p>
                <p className="mb-2 text-lg font-medium text-gray-700">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="mb-4 text-lg font-medium text-gray-700">
                  <strong>Bio:</strong> {userData.bio}
                </p>
                <div className="text-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                  >
                    Edit Profile<i className="fa-solid fa-pen ml-2"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
