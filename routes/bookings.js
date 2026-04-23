const express = require("express");
const router = express.Router();
const { bookings, flights, users } = require("../data");
const {
    authenticateToken,
    requireAdmin,
    requireSelfOrAdmin
} = require("../middleware/auth");

// Generate Booking Code
function generateCode(id) {
    return `SBK-2026-${String(id).padStart(3, "0")}`;
}

function roundMoney(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

function calculateTotals(price, passengerCount, passengerClass) {
    const classMultipliers = {
        economy: 1,
        premium: 1.25,
        business: 1.6,
        first: 2
    };

    const normalizedCount = Math.max(Number(passengerCount || 1), 1);
    const multiplier = classMultipliers[passengerClass] || 1;
    const subtotal = roundMoney(Number(price) * normalizedCount * multiplier);
    const taxes = roundMoney(subtotal * 0.12);

    return {
        subtotal,
        taxes,
        totalAmount: roundMoney(subtotal + taxes)
    };
}

function buildFlightSnapshot(flight) {
    return {
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime || "",
        aircraftType: flight.aircraftType || "",
        image: flight.image || "",
        price: flight.price
    };
}

// GET all bookings
router.get("/", authenticateToken, requireAdmin, (req, res) => {
    res.json(bookings);
});

router.get("/user/:userId", authenticateToken, requireSelfOrAdmin("userId"), (req, res) => {
    const userId = Number(req.params.userId);
    const userBookings = bookings.filter(booking => booking.userId === userId);
    res.json(userBookings);
});

// GET by ID
router.get("/:id", authenticateToken, (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
    }

    res.json(booking);
});

// CREATE booking
router.post("/", authenticateToken, (req, res) => {
    const {
        userId,
        flightId,
        seatNumber,
        passengerName,
        passengerEmail,
        phone,
        passengerClass,
        passengerCount
    } = req.body;

    const bookingUserId = req.user.role === "admin" && userId ? Number(userId) : req.user.id;

    const user = users.find(u => u.id == bookingUserId);
    const flight = flights.find(f => f.id == flightId);
    const normalizedPassengerCount = Math.max(Number(passengerCount || 1), 1);

    if (!user) return res.status(400).json({ message: "User not found" });
    if (!flight) return res.status(400).json({ message: "Flight not found" });
    if (!seatNumber) return res.status(400).json({ message: "Seat number is required" });

    const duplicateSeat = bookings.find(
        booking =>
            booking.flightId == flightId &&
            booking.seatNumber === seatNumber &&
            booking.status !== "Cancelled"
    );
    if (duplicateSeat) {
        return res.status(409).json({ message: "Seat is already booked" });
    }

    if (flight.availableSeats < normalizedPassengerCount) {
        return res.status(400).json({ message: "No available seats" });
    }

    flight.availableSeats -= normalizedPassengerCount;

    const id = bookings.length + 1;
    const totals = calculateTotals(flight.price, normalizedPassengerCount, passengerClass);

    const booking = {
        id,
        bookingCode: generateCode(id),
        userId: bookingUserId,
        flightId,
        seatNumber,
        passengerName: passengerName || user.name,
        passengerEmail: passengerEmail || user.email,
        phone: phone || user.phone || "",
        passengerClass: passengerClass || "economy",
        passengerCount: normalizedPassengerCount,
        subtotal: totals.subtotal,
        taxes: totals.taxes,
        totalAmount: totals.totalAmount,
        bookedAt: new Date().toISOString(),
        status: "Booked",
        flightSnapshot: buildFlightSnapshot(flight)
    };

    bookings.push(booking);

    res.status(201).json(booking);
});

// UPDATE / CANCEL
router.put("/:id", authenticateToken, (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role !== "admin" && booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
    }

    const flight = flights.find(f => f.id == booking.flightId);

    if (req.body.status === "Cancelled" && booking.status !== "Cancelled") {
        booking.status = "Cancelled";
        if (flight) {
            flight.availableSeats += Math.max(Number(booking.passengerCount || 1), 1);
        }
    }

    res.json(booking);
});

// DELETE
router.delete("/:id", authenticateToken, requireAdmin, (req, res) => {
    const index = bookings.findIndex(b => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookings[index];
    const flight = flights.find(entry => entry.id === booking.flightId);
    if (flight && booking.status !== "Cancelled") {
        flight.availableSeats += Math.max(Number(booking.passengerCount || 1), 1);
    }

    bookings.splice(index, 1);

    res.json({ message: "Booking deleted" });
});

module.exports = router;
