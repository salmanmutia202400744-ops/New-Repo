const express = require("express");
const router = express.Router();
const { bookings } = require("../data");

router.get("/", (req, res) => {
    res.json(bookings);
});

router.post("/", (req, res) => {

    const booking = {
        id: bookings.length + 1,
        ...req.body
    };

    bookings.push(booking);

    res.json(booking);
});

module.exports = router;