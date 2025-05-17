import Riwayat from "../models/Riwayat.js";

export const simpanRiwayat = async (req, res) => {
  try {
    const { penyakit, akurasi, saran, image} = req.body;

    const userId = req.user.id;

    const riwayatBaru = await Riwayat.create({
      userId,
      penyakit,
      akurasi,
      saran,
      image,
    });

    res.status(201).json({
      message: "Riwayat berhasil disimpan",
      riwayat: riwayatBaru,
    })
  }catch (error) {
    console.log("Error saving riwayat:", error);
    res.status(500).json({ message: "Gagal menyimpan riwayat" });
  }
}