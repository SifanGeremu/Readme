// dbConfig.js
import dotenv from "dotenv";
dotenv.config(); // ⚡ load env variables immediately

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

// Fail fast if env is missing
if (!uri) throw new Error("❌ ATLAS_URI is not defined in .env file");
if (!dbName) throw new Error("❌ DB_NAME is not defined in .env file");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // cached DB instance

export async function connectDB() {
  if (db) return db; // return cached instance

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
