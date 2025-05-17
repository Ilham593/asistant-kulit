import express from "express";
import { register, login, getProfile } from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddlewate.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);
export default router;