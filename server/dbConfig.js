// dbConfig.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("ATLAS_URI is missing in .env");
if (!dbName) throw new Error("DB_NAME is missing in .env");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let connected = false;

export async function connectDB() {
  if (!connected) {
    await client.connect();
    connected = true;
    console.log("Connected to MongoDB Atlas");
  }

  return client; // 👈 IMPORTANT: return MongoClient
}
