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
router.get("/:id", (req, res) => {
    const flight = flights.find(f => f.id == req.params.id);

    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
});

module.exports = router;