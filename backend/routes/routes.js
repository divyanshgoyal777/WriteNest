const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blog = require("../models/Blog");
const Contact = require("../models/Contact");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1y" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1y" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// Blog Creation Route
router.post("/blogs", verifyToken, async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const newBlog = new Blog({
      title,
      summary,
      content,
      author: req.user.id,
    });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully!", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog post", error });
  }
});

// Fetch All Blog Posts Route
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name"); // Populate author field if needed
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog posts", error });
  }
});

// Fetch Single Blog Post Route
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog post", error });
  }
});

// Fetch user profile route
router.get("/user/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Profile
router.put("/user/profile", verifyToken, async (req, res) => {
  const { name, email, bio, paymentDetails } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already in use" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.paymentDetails = paymentDetails || user.paymentDetails;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Payment route
router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Support WriteNest",
          },
          unit_amount: 100000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://writenest.netlify.app/success",
    cancel_url: "https://writenest.netlify.app/cancel",
  });

  res.json({ id: session.id });
});

// Fetch User's Own Blogs
router.get("/userblogs", verifyToken, async (req, res) => {
  try {
    const userBlogs = await Blog.find({ author: req.user.id });
    res.json(userBlogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user's blogs", error });
  }
});

// Edit User's Blog
router.put("/userblogs/:id", verifyToken, async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, summary, content },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found or unauthorized" });

    res.json({ message: "Blog updated successfully!", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error });
  }
});

// Delete a Blog Post Route
router.delete("/userblogs/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog post", error });
  }
});

// Contact Form Route
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to save message", error });
  }
});

// GET /home/blogs - Fetch featured blogs
router.get('/home/blogs', async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured blogs" });
  }
});

module.exports = router;