const express = require("express");
const router = express.Router();
const { flights } = require("../data");

router.get("/", (req, res) => {
    res.json(flights);
});

router.post("/", (req, res) => {

    const flight = {
        id: flights.length + 1,
        ...req.body
    };

    flights.push(flight);

    res.json(flight);
});

module.exports = router;