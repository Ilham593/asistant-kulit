import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { predictSkinDisease } from "../controllers/predictController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prediksi
 *   description: Endpoint untuk melakukan deteksi penyakit kulit
 */

/**
 * @swagger
 * /api/predict:
 *   post:
 *     summary: Melakukan deteksi penyakit kulit berdasarkan gambar
 *     tags: [Prediksi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL gambar yang akan diprediksi
 *                 example: https://dummyimage.com/300x300
 *     responses:
 *       200:
 *         description: Deteksi berhasil dilakukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 penyakit:
 *                   type: string
 *                   example: Jerawat Batu
 *                 akurasi:
 *                   type: number
 *                   example: 0.93
 *                 deskripsi:
 *                   type: string
 *                   example: Jerawat batu adalah jerawat besar dan dalam yang menyakitkan.
 *                 saran:
 *                   type: string
 *                   example: Kompres hangat, hindari memencet, dan gunakan salep jerawat.
 *       401:
 *         description: Token tidak ditemukan atau tidak valid
 *       500:
 *         description: Gagal memproses gambar
 */
router.post("/predict", verifyToken, upload.single("image"), predictSkinDisease);


export default router;
