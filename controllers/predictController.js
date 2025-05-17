export const predictSkinDisease = async (req, res) => {
  try {
    // dummy data
    const hasilPrediksi = {
      penyakit: 'jerawat batu',
      akurasi: 3,
      saran: 'jangan merokok',
    };

    await new Promise ((resolve, reject) => {
      setTimeout(() => {
        resolve(hasilPrediksi);
      }, 2000);
    });

    res.status(200).json(hasilPrediksi);
  } catch (error) {
    console.log("Error predicting skin disease:", error);
    res.status(500).json({ message: "Gagal memprediksi penyakit kulit" });
  }
}