import Riwayat from "../models/Riwayat.js";
export const predictSkinDisease = async (req, res) => {
  try {
    const { image } = req.body;

    const dummyResult = {
      penyakit: "Jerawat Batu",
      akurasi: 0.93,
      deskripsi:
        "Jerawat batu adalah jerawat besar dan dalam yang menyakitkan.",
      saran: "Kompres hangat, hindari memencet, dan gunakan salep jerawat.",
    };

    const userId = req.user.id;
    await Riwayat.create({
      userId,
      penyakit: dummyResult.penyakit,
      akurasi: dummyResult.akurasi,
      saran: dummyResult.saran,
      image,
      tanggal: new Date(),
    });

    res.json(dummyResult);
  } catch (error) {
    console.error("Dummy ML error:", error.message);
    res.status(500).json({ message: "Gagal memproses gambar." });
  }
};
