import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { simpanRiwayat , getRiwayat, getRiwayatById } from "../controllers/riwayatController.js";

const router = express.Router();

router.post("/riwayat", verifyToken, simpanRiwayat);
router.get("/riwayat", verifyToken, getRiwayat);
router.get("/riwayat/:id", verifyToken, getRiwayatById);
export default router;