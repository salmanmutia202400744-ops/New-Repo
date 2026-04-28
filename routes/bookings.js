const express = require("express");
const router = express.Router();
const { bookings } = require("../data");

// ==========================
// GET ALL BOOKINGS
// ==========================
router.get("/", (req, res) => {
    res.json(bookings);
});

// ==========================
// CREATE BOOKING (ROBUST VERSION)..
// ==========================
router.post("/", (req, res) => {

    const newId = bookings.length + 1;
    const now = new Date();

    // 🔥 GET REAL FLIGHT FROM ID (SOURCE OF TRUTH)
    const flightData = flights.find(f => f.id == req.body.flightId) || {};

    const booking = {
        id: newId,

        bookingCode:
            "SBK-" + now.getFullYear() + "-" + String(newId).padStart(3, "0"),

        bookedAt: now.toISOString(),
        status: "Booked",

        userId: req.body.userId || null,
        passengerName: req.body.passengerName || "Unknown",
        passengerEmail: req.body.passengerEmail || "",
        phone: req.body.phone || "",

        flightId: req.body.flightId || null,

        // ✅ FIXED SNAPSHOT (NO MORE N/A ISSUES)
        flightSnapshot: {
            flightNumber: flightData.flightNumber || "N/A",
            origin: flightData.origin || "N/A",
            destination: flightData.destination || "N/A",
            airline: flightData.airline || "N/A"
        },

        seatNumber: req.body.seatNumber || "Not Assigned",
        passengerClass: req.body.passengerClass || "Economy",
        totalAmount: Number(req.body.totalAmount) || 0
    };

    bookings.push(booking);

    res.status(201).json(booking);
});

module.exports = router;