import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Owner dashboard: ratings for their store
router.get("/dashboard", async (req, res) => {
  try {
    const ownerId = req.user.id;
    const [rows] = await pool.query(
      `SELECT u.name AS user_name, u.email, r.rating, r.updated_at
       FROM ratings r
       JOIN users u ON u.id=r.user_id
       WHERE r.store_id IN (SELECT id FROM stores WHERE owner_user_id=?)`,
      [ownerId]
    );

    const [[{ avg_rating }]] = await pool.query(
      `SELECT ROUND(AVG(r.rating),2) AS avg_rating
       FROM ratings r
       WHERE r.store_id IN (SELECT id FROM stores WHERE owner_user_id=?)`,
      [ownerId]
    );

    res.json({ ratings: rows, avg_rating: avg_rating || 0 });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
