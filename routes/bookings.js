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
// CREATE BOOKING (FIXED)
// ==========================
router.post("/", (req, res) => {

    const booking = {
        id: bookings.length + 1,

        // ✅ AUTO-GENERATED FIELDS
        bookingCode: `SBK-${Date.now()}`,   // or simple unique code
        bookedAt: new Date().toISOString(),
        status: "Booked",

        // ==========================
        // USER DATA FROM FRONTEND
        // ==========================
        userId: req.body.userId,
        passengerName: req.body.passengerName || "Unknown",
        passengerEmail: req.body.passengerEmail || "",
        phone: req.body.phone || "",

        // ==========================
        // FLIGHT DATA
        // ==========================
        flightId: req.body.flightId,
        flightSnapshot: req.body.flightSnapshot || null,

        // ==========================
        // OPTIONAL
        // ==========================
        seatNumber: req.body.seatNumber || null,
        passengerClass: req.body.passengerClass || "Economy",
        totalAmount: req.body.totalAmount || 0
    };

    bookings.push(booking);

    res.json(booking);
});

module.exports = router;