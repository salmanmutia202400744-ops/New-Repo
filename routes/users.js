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


// GET USERS
router.get("/", (req, res) => {
    res.json(users);
});

module.exports = router;