const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const employeeRoutes = require("./routes/employees");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/nominations", require("./routes/nominations"));

app.listen(5000, () => {
 console.log("Server Running");
});