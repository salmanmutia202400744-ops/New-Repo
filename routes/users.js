const express = require("express");
const router = express.Router();
const { users } = require("../data");


// REGISTER
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const exist = users.find(user => user.email === email);

    if (exist) {
        return res.status(400).json({
            message: "Email already used"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        password,
        role: "user"
    };

    users.push(user);

    res.json({
        message: "Registered Successfully",
        user
    });

});


// LOGIN
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid Login"
        });
    }

    res.json({
        message: "Login Success",
        user
    });

});

// ==========================
// GET CURRENT USER
// ==========================
router.get("/me", (req, res) => {
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(400).json({ message: "User ID required" });
    }

    const user = users.find(u => u.id == userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// GET USERS
router.get("/", (req, res) => {
    res.json(users);
});

module.exports = router;