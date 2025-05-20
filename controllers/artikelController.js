// const artikelDummy = [
//   {
//     id: "1",
//     judul: "Cara Merawat Kulit Berjerawat",
//     isi: "Jerawat bisa dicegah dengan menjaga kebersihan wajah...",
//     kategori: "Jerawat",
//   },
//   {
//     id: "2",
//     judul: "Mengenal Psoriasis dan Gejalanya",
//     isi: "Psoriasis adalah kondisi kulit yang menyebabkan bercak merah...",
//     kategori: "Psoriasis",
//   },
// ];

// export const getAllArtikel = (req, res) => {
//   res.json({
//     message: "Berhasil mengambil artikel",
//     artikel: artikelDummy,
//   })
// }

// export const getArtikelById = (req, res) => {
//   const { id } = req.params;
//   const artikel = artikelDummy.find((a) => a.id === id);

//   if(!artikel) {
//     return res.status(404).json({ message: "Artikel tidak ditemukan" });
//   }

//   res.json({
//     message: "Berhasil mengambil artikel",
//     artikel,
//   })
// }
