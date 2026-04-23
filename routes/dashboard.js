const express = require("express");
const router = express.Router();
const { users, flights, bookings } = require("../data");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

function getDashboardStats() {
    const cancelled = bookings.filter(
        b => b.status === "Cancelled"
    ).length;

    const totalRevenue = bookings
        .filter(booking => booking.status !== "Cancelled")
        .reduce((sum, booking) => sum + Number(booking.totalAmount || 0), 0);

    const availableSeats = flights.reduce(
        (sum, flight) => sum + Number(flight.availableSeats || 0),
        0
    );

    return {
        totalUsers: users.length,
        totalFlights: flights.length,
        totalBookings: bookings.length,
        cancelledBookings: cancelled,
        totalRevenue,
        availableSeats
    };
}

router.get("/", authenticateToken, requireAdmin, (req, res) => {
    res.json(getDashboardStats());
});

router.get("/stats", authenticateToken, requireAdmin, (req, res) => {
    res.json(getDashboardStats());
});

module.exports = router;
