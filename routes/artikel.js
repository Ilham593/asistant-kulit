import express from "express"
import { getAllArtikel, getArtikelById } from "../controllers/artikelController.js";

const router = express.Router();

router.get("/artikel", getAllArtikel);
router.get("/artikel/:id", getArtikelById);
export default router;