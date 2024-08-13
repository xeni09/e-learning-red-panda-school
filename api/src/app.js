const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { configure, initErrorHandler } = require("./middleware/middleware");
const authRouter = require("./routes/AuthRouter");
const User = require("./models/User");
const app = express();

// Verify required environment variables
if (
  !process.env.SESSION_SECRET ||
  !process.env.ADMIN_EMAIL ||
  !process.env.ADMIN_PASSWORD ||
  !process.env.MONGODB_URI
) {
  throw new Error("Missing required environment variables");
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Configure middlewares
configure(app);

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Simple authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user === "admin") {
    return next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = "admin";
    req.session.userId = user._id;
    res.redirect("/admin");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Serve login form
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = "admin";
    req.session.userId = user._id;
    res.redirect("/admin");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// Admin route
app.get("/admin", isAuthenticated, (req, res) => {
  res.send("Welcome, admin");
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Configure routes
app.use("/api/auth", authRouter);

// Initialize error handler
initErrorHandler(app);

module.exports = app;

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
