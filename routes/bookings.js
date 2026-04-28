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
// CREATE BOOKING (FIXED & SAFE)
// ==========================
router.post("/", (req, res) => {

    const newId = bookings.length + 1;

    const booking = {
        id: newId,

        // ==========================
        // CLEAN BOOKING CODE (FIXED FORMAT)
        // ==========================
        bookingCode: `SBK-${new Date().getFullYear()}-${String(newId).padStart(3, "0")}`,

        bookedAt: new Date().toISOString(),
        status: "Booked",

        // ==========================
        // USER INFO (SAFE DEFAULTS)
        // ==========================
        userId: req.body.userId || null,
        passengerName: req.body.passengerName || "Unknown",
        passengerEmail: req.body.passengerEmail || "",
        phone: req.body.phone || "",

        // ==========================
        // FLIGHT INFO (FIXED STRUCTURE)
        // ==========================
        flightId: req.body.flightId || null,

        flightSnapshot: req.body.flightSnapshot
            ? {
                flightNumber: req.body.flightSnapshot.flightNumber || "N/A",
                origin: req.body.flightSnapshot.origin || "",
                destination: req.body.flightSnapshot.destination || ""
            }
            : {
                flightNumber: "N/A",
                origin: "",
                destination: ""
            },

        // ==========================
        // OPTIONAL DATA
        // ==========================
        seatNumber: req.body.seatNumber || "Not Assigned",
        passengerClass: req.body.passengerClass || "Economy",
        totalAmount: Number(req.body.totalAmount) || 0
    };

    bookings.push(booking);

    res.status(201).json(booking);
});

module.exports = router;