import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getRiwayat, getRiwayatById } from "../controllers/riwayatController.js";

const router = express.Router();

router.get("/riwayat", verifyToken, getRiwayat);
router.get("/riwayat/:id", verifyToken, getRiwayatById);
export default router;