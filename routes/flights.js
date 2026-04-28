const express = require("express");
const router = express.Router();
const { flights } = require("../data");

// GET ALL
router.get("/", (req, res) => {
    res.json(flights);
});

// ADD FLIGHT
router.post("/", (req, res) => {
    const flight = {
        id: flights.length + 1,
        ...req.body
    };

    flights.push(flight);
    res.json(flight);
});

// GET ONE
router.get("/:id", (req, res) => {
    const flight = flights.find(f => f.id == req.params.id);

    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
});

// ✅ UPDATE FLIGHT (FIX EDIT)
router.put("/:id", (req, res) => {
    const index = flights.findIndex(f => f.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Flight not found" });
    }

    flights[index] = {
        ...flights[index],
        ...req.body
    };

    res.json(flights[index]);
});

// ✅ DELETE FLIGHT (FIX DELETE)
router.delete("/:id", (req, res) => {
    const index = flights.findIndex(f => f.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Flight not found" });
    }

    const deleted = flights.splice(index, 1);

    res.json({
        message: "Flight deleted",
        flight: deleted[0]
    });
});

module.exports = router;