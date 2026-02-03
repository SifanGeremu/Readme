// auth/betterAuth.js
import { betterAuth } from "better-auth";
import { connectDB } from "../dbConfig.js";

const BASE_URL = process.env.BETTER_AUTH_BASE_URL;

if (!BASE_URL || !BASE_URL.startsWith("http")) {
  throw new Error("BETTER_AUTH_BASE_URL must be set and valid.");
}

export async function initBetterAuth() {
  const mongoClient = await connectDB();

  return betterAuth({
    baseURL: BASE_URL,
    trustedOrigins: [BASE_URL],
    secret: process.env.BETTER_AUTH_SECRET,

    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scopes: ["user:email", "repo"], // 👈 what you wanted
      },
    },

    adapter: {
      mongoClient, // 👈 correct adapter input
    },

    debug: true,
  });
}
