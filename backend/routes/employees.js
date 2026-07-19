const express = require("express");
const router = require("express").Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const sql =
      "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)";

    await db.query(sql, [name, email, department]);

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