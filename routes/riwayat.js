import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { simpanRiwayat , getRiwayat } from "../controllers/riwayatController.js";

const router = express.Router();

router.post("/riwayat", verifyToken, simpanRiwayat);
router.get("/riwayat", verifyToken, getRiwayat);
export default router;