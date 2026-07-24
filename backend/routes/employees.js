const express = require("express");
const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    
    const { name, email, department, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO employees (name, email, department, password) VALUES (?, ?, ?, ?)";

    await db.query(sql, [name, email, department, hashedPassword]);

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/", async (req, res) => {
 const [rows] = await db.query(
   "SELECT id,name,email,department FROM employees"
 );

 res.json(rows);
});

module.exports = router;