import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Endpoint untuk komentar dan masukan dari pengguna
 */

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Mengambil semua komentar pengguna
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar komentar
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
 *                       user:
 *                         type: string
 *                         example: ilhamdev
 *                       komentar:
 *                         type: string
 *                         example: Aplikasinya sangat membantu!
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Gagal mengambil data dari server
 */
router.get("/", async (req, res) => {
  try {
    const data = await Feedback.find().sort({ tanggal: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Mengirim komentar dari pengguna
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - komentar
 *             properties:
 *               user:
 *                 type: string
 *                 example: ilhamdev
 *               komentar:
 *                 type: string
 *                 example: Aplikasi sangat informatif dan mudah digunakan!
 *     responses:
 *       200:
 *         description: Komentar berhasil dikirim
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Komentar berhasil dikirim.
 *       400:
 *         description: Data komentar tidak lengkap
 *       500:
 *         description: Terjadi kesalahan di server saat menyimpan komentar
 */
router.post("/", async (req, res) => {
  try {
    const { user, komentar } = req.body;

    if (!user || !komentar) {
      return res.status(400).json({ success: false, message: "Isi komentar tidak lengkap" });
    }

    const newFeedback = new Feedback({ user, komentar });
    await newFeedback.save();
    res.json({ success: true, message: "Komentar berhasil dikirim." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
