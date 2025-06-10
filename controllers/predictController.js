import Riwayat from "../models/Riwayat.js";
import fs from "fs";
import sharp from "sharp";
import * as ort from "onnxruntime-node";
import path from "path";

const modelPath = path.resolve("models/best_skin_model.onnx");


let session;
(async () => {
  session = await ort.InferenceSession.create(modelPath);
})();

const categories = [
  "Acne",
  "Blackheads",
  "Dark Spots",
  "Normal Skin",
  "Oily Skin",
  "Wrinkles",
];

export const predictSkinDisease = async (req, res) => {
  try {
    const imageBuffer = req.file?.buffer; 
    if (!imageBuffer) {
      return res.status(400).json({ message: "Gambar tidak ditemukan." });
    }

    const raw = await sharp(imageBuffer)
      .resize(224, 224)
      .raw()
      .toBuffer();

    const floatArr = new Float32Array(224 * 224 * 3);
    for (let i = 0; i < floatArr.length; i++) {
      floatArr[i] = raw[i] / 127.5 - 1; 
    }

    const inputTensor = new ort.Tensor("float32", floatArr, [1, 224, 224, 3]);
    const feeds = {};
    feeds[session.inputNames[0]] = inputTensor;

    const results = await session.run(feeds);
    const output = results[session.outputNames[0]].data;

    const maxIdx = output.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

    const prediksi = categories[maxIdx];
    const confidence = output[maxIdx];

    const hasil = {
      penyakit: prediksi,
      akurasi: confidence,
      deskripsi: `Deteksi kondisi kulit: ${prediksi}`,
      saran: "Silakan konsultasi lebih lanjut dengan dokter kulit.",
    };

    // simpan
    const userId = req.user.id;
    await Riwayat.create({
      userId,
      penyakit: hasil.penyakit,
      akurasi: hasil.akurasi,
      saran: hasil.saran,
      image: imageBuffer, 
      tanggal: new Date(),
    });

    res.json(hasil);
  } catch (error) {
    console.error("ONNX error:", error);
    res.status(500).json({ message: "Gagal mendeteksi gambar." });
  }
};