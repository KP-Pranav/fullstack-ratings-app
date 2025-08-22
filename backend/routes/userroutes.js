import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// List stores
router.get("/stores", async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.address,
              IFNULL(ROUND(AVG(r.rating),2),0) AS rating,
              (SELECT rating FROM ratings WHERE user_id=? AND store_id=s.id) AS user_rating
       FROM stores s
       LEFT JOIN ratings r ON r.store_id=s.id
       GROUP BY s.id`,
      [userId]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Rate store
router.post("/stores/:id/rate", async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.user.id;
    const storeId = req.params.id;
    if (!(rating >= 1 && rating <= 5))
      return res.status(400).json({ error: "Rating must be 1–5" });

    await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES (?,?,?)
       ON DUPLICATE KEY UPDATE rating=VALUES(rating)`,
      [userId, storeId, rating]
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
