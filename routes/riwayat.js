import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getRiwayat, getRiwayatById } from "../controllers/riwayatController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Riwayat
 *   description: Endpoint untuk riwayat deteksi penyakit kulit
 */

/**
 * @swagger
 * /api/riwayat:
 *   get:
 *     summary: Mengambil seluruh riwayat deteksi milik user yang sedang login
 *     tags: [Riwayat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Riwayat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Riwayat berhasil diambil
 *                 riwayat:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       penyakit:
 *                         type: string
 *                       akurasi:
 *                         type: number
 *                       saran:
 *                         type: string
 *                       tanggal:
 *                         type: string
 *                       image:
 *                         type: string
 *       401:
 *         description: Token tidak ditemukan atau tidak valid
 *       500:
 *         description: Gagal mengambil riwayat
 */
router.get("/riwayat", verifyToken, getRiwayat);

/**
 * @swagger
 * /api/riwayat/{id}:
 *   get:
 *     summary: Mengambil detail riwayat berdasarkan ID
 *     tags: [Riwayat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari riwayat deteksi
 *         schema:
 *           type: string
 *           example: 662c482ff3340eb55b26cd0f
 *     responses:
 *       200:
 *         description: Riwayat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     penyakit:
 *                       type: string
 *                     akurasi:
 *                       type: number
 *                     saran:
 *                       type: string
 *                     image:
 *                       type: string
 *                     tanggal:
 *                       type: string
 *       401:
 *         description: Token tidak ditemukan atau tidak valid
 *       404:
 *         description: Riwayat tidak ditemukan
 *       500:
 *         description: Gagal mengambil detail riwayat
 */
router.get("/riwayat/:id", verifyToken, getRiwayatById);

export default router;
