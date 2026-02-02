// routes/auth.js
import express from "express";
import { auth } from "../Auth/betterAuth.js";

const router = express.Router();

// This line is the magic
router.use("/auth", auth.handler);

export default router;
