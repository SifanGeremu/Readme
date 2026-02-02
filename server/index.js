import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { connectDB } from "./dbConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

let db; // cached DB instance

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

// Connect to DB first, then start server
(async () => {
  try {
    db = await connectDB(); // connect once at startup
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
