const express = require("express");
const cors = require("cors");
const app = express();

// =======================
// MUST BE FIRST
// =======================
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "user-id"]
}));

app.use(express.json());

// =======================
// ROUTES
// =======================
const bookingRoutes = require("./routes/bookings");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", require("./routes/users"));
app.use("/api/flights", require("./routes/flights"));

app.get("/", (req, res) => {
    res.json({ message: "Elite Airways API Running" });
});

app.listen(3000, () => {
    console.log("Server Running");
});