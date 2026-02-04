import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/passport.js";
import { connectDB } from "./config/dbConfig.js";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
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

// Mount auth routes
app.use("/", authRoutes);

// Test route
app.get("/ping", (req, res) => res.json({ status: "ok" }));

// Protected route
app.get("/dashboard", authMiddleware);

const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`),
);
