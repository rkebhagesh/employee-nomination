const express = require("express");
const router = express.Router();

const db = require("../config/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("Auth routes loaded");

router.post("/login", async (req, res) => {

    console.log("Login API called");

    try {

        const { email, password } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM employees WHERE email=?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const employee = rows[0];

        const validPassword = await bcrypt.compare(
            password,
            employee.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: employee.id,
                name: employee.name,
                email: employee.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({

            token,

            employee: {

                id: employee.id,

                name: employee.name,

                email: employee.email,

                department: employee.department

            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

});

module.exports = router;