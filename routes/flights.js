const express = require("express");
const router = express.Router();
const { flights } = require("../data");

// ==========================
// GET ALL FLIGHTS
// ==========================
router.get("/", (req, res) => {
    res.json(flights);
});

// ==========================
// ADD FLIGHT (SAFE VERSION)
// ==========================
router.post("/", (req, res) => {
    const flight = {
        id: flights.length + 1,

        flightNumber: req.body.flightNumber || "N/A",
        airline: req.body.airline || "Elite Airways",
        origin: req.body.origin || "",
        destination: req.body.destination || "",
        departureTime: req.body.departureTime || "",
        arrivalTime: req.body.arrivalTime || "",

        // ✅ IMPORTANT: ensure numeric + default value
        availableSeats: Number(req.body.availableSeats) || 0,

        price: Number(req.body.price) || 0,

        image: req.body.image || "",
        status: req.body.status || "scheduled",
        aircraftType: req.body.aircraftType || "",

        createdAt: new Date().toISOString()
    };

    flights.push(flight);

    res.status(201).json(flight);
});

// ==========================
// GET ONE FLIGHT
// ==========================
router.get("/:id", (req, res) => {
    const flight = flights.find(f => f.id == req.params.id);

    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
});

// ==========================
// UPDATE FLIGHT
// ==========================
router.put("/:id", (req, res) => {
    const index = flights.findIndex(f => f.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Flight not found" });
    }

    flights[index] = {
        ...flights[index],
        ...req.body
    };

    res.json({
        message: "Flight updated",
        flight: flights[index]
    });
});

// ==========================
// DELETE FLIGHT
// ==========================
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