const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all nominations
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        n.id,
        e1.name AS nominee,
        e2.name AS nominated_by,
        n.reason,
        n.month_year
      FROM nominations n
      JOIN employees e1 ON n.nominee_id = e1.id
      JOIN employees e2 ON n.nominated_by = e2.id
      ORDER BY n.id DESC
    `;

    const [rows] = await db.query(sql);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Check duplicate nomination
router.get("/check", async (req, res) => {
  try {
    const { nominated_by, nominee_id, month_year } = req.query;

    const sql = `
      SELECT id
      FROM nominations
      WHERE nominated_by = ?
      AND nominee_id = ?
      AND month_year = ?
    `;

    const [rows] = await db.query(sql, [
      nominated_by,
      nominee_id,
      month_year,
    ]);

    res.json({
      exists: rows.length > 0,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Insert nomination
router.post("/", async (req, res) => {
  try {
    const {
      nominated_by,
      nominee_id,
      month_year,
      reason,
    } = req.body;

    // Prevent self nomination
    if (Number(nominated_by) === Number(nominee_id)) {
      return res.status(400).json({
        message: "You cannot nominate yourself.",
      });
    }

    const sql = `
      INSERT INTO nominations
      (nominated_by, nominee_id, month_year, reason)
      VALUES (?, ?, ?, ?)
    `;

    await db.query(sql, [
      nominated_by,
      nominee_id,
      month_year,
      reason,
    ]);

    res.json({
      message: "Nomination submitted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/stats", async (req, res) => {
  try {
    const monthYear = new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      .replace(" ", "-");

    const [[total]] = await db.query(
      "SELECT COUNT(*) AS total FROM nominations"
    );

    const [[monthly]] = await db.query(
      "SELECT COUNT(*) AS total FROM nominations WHERE month_year=?",
      [monthYear]
    );

    res.json({
      total: total.total,
      monthly: monthly.total,
    });

    console.log("Total nominations:", total.total);
    console.log("Monthly nominations:", monthly.total);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;