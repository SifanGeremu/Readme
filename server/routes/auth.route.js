// routes/auth.js
import express from "express";
import { auth } from "../auth/betterAuth.js";

const router = express.Router();


router.use("/auth", auth.handler);

export default router;
