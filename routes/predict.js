import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { predictSkinDisease } from "../controllers/predictController.js";

const router = express.Router();

router.post("/predict", verifyToken, predictSkinDisease);
export default router;