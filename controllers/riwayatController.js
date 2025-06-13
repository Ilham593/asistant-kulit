import Riwayat from "../models/Riwayat.js";
export const simpanRiwayat = async (req, res) => {
  try {
    const riwayat = new Riwayat(req.body);
    await riwayat.save();
    res.status(201).json({ success: true, message: 'Riwayat berhasil disimpan' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRiwayatByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const riwayat = await Riwayat.find({ userId }).sort({ tanggal: -1 });
    res.json({ success: true, data: riwayat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
