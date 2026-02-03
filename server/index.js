import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { initBetterAuth } from "./auth/betterAuth.js";

const app = express();

const auth = await initBetterAuth();


app.use("/auth", toNodeHandler(auth));

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server running at ${process.env.BETTER_AUTH_BASE_URL}`);
});
