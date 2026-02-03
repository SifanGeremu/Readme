
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("ATLAS_URI is missing in .env");
if (!dbName) throw new Error("DB_NAME is missing in .env");

let client;
let connected = false;

export async function connectDB() {
  if (!connected) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    connected = true;
    console.log(`Connected to MongoDB Atlas: ${dbName}`);
  }

  return client.db(dbName); // return database instance for Passport.js
}
