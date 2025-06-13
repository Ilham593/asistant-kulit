import express from 'express';
import { simpanRiwayat, getRiwayatByUser } from '../controllers/riwayatController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Riwayat
 *   description: Endpoint untuk menyimpan dan mengambil riwayat deteksi pengguna
 */

/**
 * @swagger
 * /api/riwayat:
 *   post:
 *     summary: Menyimpan riwayat deteksi penyakit kulit
 *     tags: [Riwayat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - penyakit
 *               - confidence
 *               - rekomendasi
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 662acfe1ecb87c82e2a47d6f
 *               penyakit:
 *                 type: string
 *                 example: Acne
 *               confidence:
 *                 type: number
 *                 format: float
 *                 example: 0.875
 *               rekomendasi:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nama:
 *                       type: string
 *                       example: Cetaphil Gentle Cleanser
 *                     produk:
 *                       type: string
 *                       example: Sabun Pembersih
 *                     harga:
 *                       type: number
 *                       example: 85000
 *     responses:
 *       200:
 *         description: Riwayat berhasil disimpan
 *       400:
 *         description: Data tidak lengkap atau invalid
 *       500:
 *         description: Terjadi kesalahan saat menyimpan data
 */
router.post('/', simpanRiwayat);

/**
 * @swagger
 * /api/riwayat/{userId}:
 *   get:
 *     summary: Mengambil semua riwayat deteksi berdasarkan ID pengguna
 *     tags: [Riwayat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Data riwayat berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       penyakit:
 *                         type: string
 *                       confidence:
 *                         type: number
 *                       tanggal:
 *                         type: string
 *                         format: date-time
 *                       rekomendasi:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nama:
 *                               type: string
 *                             produk:
 *                               type: string
 *                             harga:
 *                               type: number
 *       404:
 *         description: Riwayat tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan saat mengambil data
 */
router.get('/:userId', getRiwayatByUser);

export default router;
