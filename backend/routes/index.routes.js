import { Router } from "express";
import { pool } from "../db.js";

const router = Router();
router.get('/test', async (req, res) => {
    res.status(200).json({ message: 'test is success!' })
})

export default router;