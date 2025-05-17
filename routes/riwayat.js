import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { simpanRiwayat } from "../controllers/riwayatController.js";

const router = express.Router();

router.post("/riwayat", verifyToken, simpanRiwayat);
export default router;