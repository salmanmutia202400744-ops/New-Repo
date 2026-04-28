const express = require("express");
const cors = require("cors");

const app = express();
const bookingRoutes = require("./routes/bookings");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/dashboard", dashboardRoutes);

app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", require("./routes/users"));
app.use("/api/flights", require("./routes/flights"));
app.use("/api/bookings", require("./routes/bookings"));


app.get("/", (req, res) => {
    res.json({
        message: "Elite Airways API Running"
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});