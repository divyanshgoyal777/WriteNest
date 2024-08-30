import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.msg || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={logo} width={130} alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center text-lg cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
