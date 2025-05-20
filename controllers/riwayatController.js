import Riwayat from "../models/Riwayat.js";

// get all
export const getRiwayat = async (req, res) => {
  try {
    const userId = req.user.id;

    const riwayat = await Riwayat.find({ userId }).sort({ tanggal: -1 });

    res.status(200).json({
      message: "Riwayat berhasil diambil",
      riwayat,
    });
  } catch (error) {
    console.error("Error getting riwayat:", error);
    res.status(500).json({ message: "Gagal mengambil riwayat" });
  }
};


// byID
export const getRiwayatById = async (req, res) => {
  try {
    const userId = req.user.id;
    const riwayatId = req.params.id;

    const riwayat = await Riwayat.findOne({ _id: riwayatId, userId });

    if (!riwayat) {
      return res.status(404).json({ message: "Riwayat tidak ditemukan" });
    }

    res.status(200).json({
      message: "Riwayat berhasil diambil",
      data: riwayat,
    });
  } catch (error) {
    console.error("Error getting riwayat by ID:", error);
    res.status(500).json({ message: "Gagal mengambil detail riwayat" });
  }
};
