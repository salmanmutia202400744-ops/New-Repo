const express = require("express");
const router = express.Router();

const { users, sessions } = require("../data");
const { issueTokenForUser } = require("../middleware/auth");

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = issueTokenForUser(user);

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

module.exports = router;