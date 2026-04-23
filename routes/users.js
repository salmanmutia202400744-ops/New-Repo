const express = require("express");
const router = express.Router();
const { users } = require("../data");
const {
  sanitizeUser,
  issueTokenForUser,
  revokeToken,
  authenticateToken,
  requireAdmin,
  requireSelfOrAdmin
} = require("../middleware/auth");

// GET all users
router.get("/", authenticateToken, requireAdmin, (req, res) => {
  res.json(users.map(sanitizeUser));
});

// CREATE user
router.post("/", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find(user => user.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const user = {
    id: users.length + 1,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "user",
    phone: phone || "",
    createdAt: new Date().toISOString()
  };

  users.push(user);
  res.status(201).json({
    message: "User registered successfully",
    user: sanitizeUser(user)
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    entry => entry.email.toLowerCase() === normalizedEmail && entry.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = issueTokenForUser(user);
  res.json({
    token,
    user: sanitizeUser(user)
  });
});

router.get("/verify", authenticateToken, (req, res) => {
  res.json({
    user: sanitizeUser(req.user)
  });
});

router.post("/logout", authenticateToken, (req, res) => {
  revokeToken(req.token);
  res.json({ message: "Logged out successfully" });
});

router.get("/:id", authenticateToken, requireSelfOrAdmin("id"), (req, res) => {
  const user = users.find(entry => entry.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(sanitizeUser(user));
});

router.put("/:id", authenticateToken, requireSelfOrAdmin("id"), (req, res) => {
  const user = users.find(entry => entry.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, phone, password } = req.body;

  if (email) {
    const normalizedEmail = email.trim().toLowerCase();
    const emailOwner = users.find(
      entry => entry.id !== user.id && entry.email.toLowerCase() === normalizedEmail
    );

    if (emailOwner) {
      return res.status(409).json({ message: "Email already in use" });
    }

    user.email = normalizedEmail;
  }

  if (name) user.name = name.trim();
  if (phone !== undefined) user.phone = phone;
  if (password) user.password = password;

  res.json(sanitizeUser(user));
});

module.exports = router;
