// server.js
import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { initBetterAuth } from "./auth/betterAuth.js";

const app = express();

const auth = await initBetterAuth();
console.log("✅ better-auth initialized");

// 👇 THIS is the ONLY auth wiring
app.use("/auth", toNodeHandler(auth));
console.log("✅ better-auth mounted at /auth");

app.use(express.json());

// Test route
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
