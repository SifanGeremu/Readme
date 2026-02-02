import { betterAuth } from "better-auth";

const BASE_URL = process.env.BETTER_AUTH_BASE_URL;

if (!BASE_URL || !BASE_URL.startsWith("http")) {
  throw new Error("BETTER_AUTH_BASE_URL is missing or invalid");
}

export const auth = betterAuth({
  baseURL: BASE_URL,
  trustedOrigins: [BASE_URL],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
