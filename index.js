const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/flights", require("./routes/flights"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (req, res) => {
    res.json({
        message: "SkyBook API Running"
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});