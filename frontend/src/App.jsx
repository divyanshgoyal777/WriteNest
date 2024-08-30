import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login";
import Signup from "./components/auth/Signup/Signup";
import About from "./components/about/About";
import PageNotFound from "./components/PageNotFound";
import { useAuth } from "./context/AuthContext";
import Contact from "./components/contact/Contact";
import Blog from "./components/blog/Blog";
import Loader from "./components/common/Loader/Loader";
import PaymentCard from "./components/payment/PaymentCard/PaymentCard";
import Profile from "./components/profile/Profile";
import BlogCard from "./components/blog/BlogCard";
import ManageBlog from "./components/blog/ManageBlog";
import SingleBlogPost from "./components/blog/SingleBlogPost";
import SuccessPage from "./components/payment/PaymentCard/Successpage";
import CancelPage from "./components/payment/PaymentCard/CancelPage";

function AppRoutes() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route
              path="/login"
              element={auth.token ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/signup"
              element={auth.token ? <Navigate to="/" /> : <Signup />}
            />

            <Route
              path="/"
              element={auth.token ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/about"
              element={auth.token ? <About /> : <Navigate to="/login" />}
            />

            <Route
              path="/contact"
              element={auth.token ? <Contact /> : <Navigate to="/login" />}
            />

            <Route
              path="/blog"
              element={auth.token ? <Blog /> : <Navigate to="/login" />}
            />

            <Route
              path="/payment"
              element={auth.token ? <PaymentCard /> : <Navigate to="/login" />}
            />

            <Route
              path="/profile"
              element={auth.token ? <Profile /> : <Navigate to="/login" />}
            />

            <Route
              path="/createblog"
              element={auth.token ? <BlogCard /> : <Navigate to="/login" />}
            />

            <Route
              path="/manageblog"
              element={auth.token ? <ManageBlog /> : <Navigate to="/login" />}
            />

            <Route
              path="/blog/:id"
              element={
                auth.token ? <SingleBlogPost /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/success"
              element={auth.token ? <SuccessPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/cancel"
              element={auth.token ? <CancelPage /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}



function App() {
  return (
      <Router>
        <AppRoutes />
      </Router>
  );
}

export default App;
