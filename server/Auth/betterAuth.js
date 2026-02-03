import { betterAuth } from "better-auth";
import { connectDB } from "../dbConfig.js";

const BASE_URL = process.env.BETTER_AUTH_BASE_URL;

export async function initBetterAuth() {
  const db = await connectDB();

  return betterAuth({
    baseURL: BASE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [BASE_URL],

    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scopes: ["user:email", "public_repo"], 
      },
    },

    adapter: {
      mongoClient: db.client, 
    },

    debug: true,
  });
}

export default { initBetterAuth };