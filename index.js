const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const flightRoutes = require("./routes/flights");
const bookingRoutes = require("./routes/bookings");
const dashboardRoutes = require("./routes/dashboard");

// IMPORTANT: API PREFIX (KEEP CONSISTENT)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
    res.json({
        message: "SkyBook API running",
        status: "OK"
    });
});

// ======================
// START SERVER (ONLY ONCE)
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});