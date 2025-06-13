import express from "express";
import Feedback from "../models/Feedback.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Feedback.find().sort({ tanggal: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

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
