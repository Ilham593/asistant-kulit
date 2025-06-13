import axios from "axios";

const API_BASE = "https://asistant-kulit-production-7ab2.up.railway.app/api/riwayat";

export const simpanRiwayat = async (userId, hasil) => {
  if (!userId) return;

  const payload = {
    userId,
    penyakit: hasil.disease,
    confidence: hasil.confidence,
    rekomendasi: hasil.recommendations.map((item) => ({
      nama: item.brand,
      produk: item.name,
      harga: Number(item.price.replace(/[^\d]/g, "")),
    })),
  };

  try {
    const res = await axios.post(API_BASE, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
