import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./dbConfig.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/users", async (req, res) => {
  const db = await connectDB();
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
