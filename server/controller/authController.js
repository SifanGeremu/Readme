// controllers/authController.js

// Dashboard: protected route
export function dashboard(req, res) {
  // safe user object
  const safeUser = {
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar, // optional
  };
  res.status(200).json({ loggedIn: true, user: safeUser });
}

// Session validation: restore frontend auth state
export function sessionValidation(req, res) {
  if (req.user) {
    const safeUser = {
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
    };
    res.status(200).json({ loggedIn: true, user: safeUser });
  } else {
    res.status(401).json({ loggedIn: false, error: "Not authenticated" });
  }
}

// Logout: destroy session
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // default session cookie
    res.status(200).json({ message: "Logged out" });
  });
}
