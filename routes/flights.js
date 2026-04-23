const express = require("express");
const router = express.Router();
const { flights, bookings } = require("../data");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

function normalizeFlightPayload(payload) {
    return {
        flightNumber: payload.flightNumber,
        airline: payload.airline,
        origin: payload.origin,
        destination: payload.destination,
        departureTime: payload.departureTime,
        arrivalTime: payload.arrivalTime || "",
        availableSeats: Number(payload.availableSeats || 0),
        price: Number(payload.price || 0),
        image: payload.image || payload.imageUrl || "",
        status: payload.status || "scheduled",
        aircraftType: payload.aircraftType || ""
    };
}

// GET all flights
router.get("/", (req, res) => {
    res.json(flights);
});

// SEARCH
router.get("/search", (req, res) => {
    const origin = (req.query.origin || "").trim().toLowerCase();
    const destination = (req.query.destination || "").trim().toLowerCase();
    const departDate = (req.query.departDate || "").trim();

    const result = flights.filter(flight => {
        const originMatch = !origin || flight.origin.toLowerCase().includes(origin);
        const destinationMatch = !destination || flight.destination.toLowerCase().includes(destination);
        const dateMatch = !departDate ||
            (flight.departureTime && flight.departureTime.slice(0, 10) === departDate);

        return originMatch && destinationMatch && dateMatch;
    });

    res.json(result);
});

// GET by ID
router.get("/:id", (req, res) => {
    const flight = flights.find(entry => entry.id === Number(req.params.id));

    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
});

// CREATE flight
router.post("/", authenticateToken, requireAdmin, (req, res) => {
    const flightData = normalizeFlightPayload(req.body);

    if (!flightData.flightNumber ||
        !flightData.airline ||
        !flightData.origin ||
        !flightData.destination ||
        !flightData.departureTime ||
        !flightData.arrivalTime ||
        !flightData.availableSeats ||
        !flightData.price
    ) {
        return res.status(400).json({ message: "Missing required flight fields" });
    }

    const duplicateFlight = flights.find(
        entry => entry.flightNumber.toLowerCase() === flightData.flightNumber.toLowerCase()
    );

    if (duplicateFlight) {
        return res.status(409).json({ message: "Flight number already exists" });
    }

    const flight = {
        id: flights.length + 1,
        ...flightData,
        createdAt: new Date().toISOString()
    };

    flights.push(flight);
    res.status(201).json(flight);
});

// UPDATE flight
router.put("/:id", authenticateToken, requireAdmin, (req, res) => {
    const flight = flights.find(entry => entry.id === Number(req.params.id));

    if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
    }

    const updates = normalizeFlightPayload({
        ...flight,
        ...req.body
    });

    Object.assign(flight, updates);
    res.json(flight);
});

// DELETE flight
router.delete("/:id", authenticateToken, requireAdmin, (req, res) => {
    const flightId = Number(req.params.id);
    const index = flights.findIndex(entry => entry.id === flightId);

    if (index === -1) {
        return res.status(404).json({ message: "Flight not found" });
    }

    const activeBookings = bookings.some(
        booking => booking.flightId === flightId && booking.status !== "Cancelled"
    );
    if (activeBookings) {
        return res.status(400).json({ message: "Cannot delete a flight with active bookings" });
    }

    flights.splice(index, 1);
    res.json({ message: "Flight deleted successfully" });
});

module.exports = router;