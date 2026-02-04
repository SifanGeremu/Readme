import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/passport.js";
import { connectDB } from "./config/dbConfig.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
await connectDB();

// Public routes
app.use("/", authRoutes); // OAuth login & callback routes

// Test route
app.get("/ping", (req, res) => res.json({ status: "ok" }));

// Protected route: Dashboard
app.get("/dashboard", authMiddleware, (req, res) => {
  // return safe user object
  const safeUser = {
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar, 
  };
  res.status(200).json({ loggedIn: true, user: safeUser });
});

// Session validation endpoint (frontend restore)
app.get("/auth/session", (req, res) => {
  if (req.user) {
    const safeUser = {
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
    };
    res.status(200).json({ loggedIn: true, user: safeUser });
  } else {
    res.status(401).json({ loggedIn: false, error: "Not authenticated" });
  }
});

// Logout endpoint
app.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // clear session cookie
    res.status(200).json({ message: "Logged out" });
  });
});

// Start server
const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`),
);
