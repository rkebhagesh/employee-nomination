const express = require("express");
const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    
    const { name, email, department, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO employees (name, email, department, password, role) VALUES (?, ?, ?, ?, ?)";

    await db.query(sql, [name, email, department, hashedPassword, role]);

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
   "SELECT id,name,email,department,role FROM employees"
 );

 res.json(rows);
});

// Update employee

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT id, name, email, department, role
       FROM employees
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, role } = req.body;

    const sql = `
      UPDATE employees
      SET name = ?, email = ?, department = ?, role = ?
      WHERE id = ?
    `;

    await db.query(sql, [
      name,
      email,
      department,
      role,
      id,
    ]);

    res.json({
      success: true,
      message: "Employee updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Delete employee


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [madeNominations] = await db.query(
  "SELECT COUNT(*) AS total FROM nominations WHERE nominated_by = ?",
  [id]
);

const [receivedNominations] = await db.query(
  "SELECT COUNT(*) AS total FROM nominations WHERE nominee_id = ?",
  [id]
);

if (
  madeNominations[0].total > 0 ||
  receivedNominations[0].total > 0
) {
  return res.status(400).json({
    success: false,
    message: "Cannot delete employee because they have nomination records.",
  });
}

    // Optional: Prevent deleting admin
    const [employee] = await db.query(
      "SELECT role FROM employees WHERE id = ?",
      [id]
    );

    if (employee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (employee[0].role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be deleted.",
      });
    }

    await db.query(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;