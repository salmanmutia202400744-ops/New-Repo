const express = require("express");
const router = express.Router();
const { bookings } = require("../data");

// ==========================
// GET ALL BOOKINGS
// ==========================
router.get("/", (req, res) => {
    res.json(bookings);
});
router.get("/my", (req, res) => {
    const userId = Number(req.headers["user-id"]);

    if (!userId) {
        return res.status(400).json({ message: "User ID required" });
    }

    const userBookings = bookings.filter(
        b => Number(b.userId) === userId
    );

    res.json(userBookings);
});

// ==========================
// CREATE BOOKING (ROBUST VERSION)
// ==========================
router.post("/", (req, res) => {

    const newId = bookings.length + 1;
    const now = new Date();

    const flight = req.body.flightSnapshot || {};

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

        // ✅ ALWAYS SAFE STRUCTURE (prevents undefined/N/A issues)
        flightSnapshot: {
            flightNumber: flight.flightNumber || "N/A",
            origin: flight.origin || "N/A",
            destination: flight.destination || "N/A"
        },

        seatNumber: req.body.seatNumber || "Not Assigned",
        passengerClass: req.body.passengerClass || "Economy",
        totalAmount: Number(req.body.totalAmount) || 0
    };

    bookings.push(booking);

    res.status(201).json(booking);
});

module.exports = router;