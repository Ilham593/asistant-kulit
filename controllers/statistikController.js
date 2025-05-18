// import Riwayat from "../models/Riwayat.js";

// export const getStatistikUser = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const semuaRiwayat = await Riwayat.find({ userId });

//     const total = semuaRiwayat.length;

//     const hariIni = new Date().toISOString().slice(0, 10); 
//     const deteksiHariIni = semuaRiwayat.filter((item) =>
//       item.tanggal.toISOString().startsWith(hariIni)
//     ).length;

//     const deteksiPerTanggal = {};
//     semuaRiwayat.forEach((item) => {
//       const tgl = item.tanggal.toISOString().slice(0, 10);
//       deteksiPerTanggal[tgl] = (deteksiPerTanggal[tgl] || 0) + 1;
//     });

//     const deteksiPerPenyakit = {};
//     semuaRiwayat.forEach((item) => {
//       const penyakit = item.penyakit;
//       deteksiPerPenyakit[penyakit] = (deteksiPerPenyakit[penyakit] || 0) + 1;
//     });

//     res.json({
//       total,
//       deteksiHariIni,
//       deteksiPerTanggal,
//       deteksiPerPenyakit,
//     });
//   } catch (err) {
//     console.error("Gagal ambil statistik:", err);
//     res.status(500).json({ message: "Gagal mengambil statistik" });
//   }
// };
