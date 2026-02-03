import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import { connectDB } from "../config/dbConfig.js";

dotenv.config();

const db = await connectDB();
const usersCollection = db.collection("users");

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await usersCollection.findOne({ githubId: profile.id });
        if (!user) {
          const result = await usersCollection.insertOne({
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            emails: profile.emails || [],
            createdAt: new Date(),
          });
          user = await usersCollection.findOne({ _id: result.insertedId });
        }
        user.accessToken = accessToken;
        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);

export default passport;
