const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const flightRoutes = require("./routes/flights");
const bookingRoutes = require("./routes/bookings");
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth");

app.use("/api/flights", flightsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRoutes);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SkyBook API running",
        status: "OK"
    });
});

app.use("/users", userRoutes);
app.use("/flights", flightRoutes);
app.use("/bookings", bookingRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running...");
});