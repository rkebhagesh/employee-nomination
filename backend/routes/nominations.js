const router = require("express").Router();
const db = require("../config/db");

router.post("/", async (req, res) => {

 const {
   nominee_id,
   nominated_by,
   reason,
   month_year
 } = req.body;

 await db.query(
   `INSERT INTO nominations
   (nominee_id,nominated_by,reason,month_year)
   VALUES (?,?,?,?)`,
   [nominee_id,nominated_by,reason,month_year]
 );

 res.json({
   success: true,
   message: "Nomination Submitted"
 });
});

router.get("/", async (req, res) => {

 const [rows] = await db.query(`
 SELECT
 n.id,
 e1.name nominee,
 e2.name nominated_by,
 n.reason,
 n.month_year
 FROM nominations n
 JOIN employees e1
 ON n.nominee_id=e1.id
 JOIN employees e2
 ON n.nominated_by=e2.id
 `);

 res.json(rows);
});

module.exports = router;