
import express from "express";
import passport from "../auth/passport.js";

const router = express.Router();

// GitHub login redirect
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email", "repo"] }),
);

// GitHub OAuth callback
router.get(
  "/api/auth/callback/github", // matches your GitHub OAuth App
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  },
);

// Logout
router.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

export default router;
