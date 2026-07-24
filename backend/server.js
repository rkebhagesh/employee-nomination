require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const employeeRoutes = require("./routes/employees");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/nominations", require("./routes/nominations"));
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running");
});