import axios from "axios";

const simpanRiwayat = async (hasil) => {
  if (!user || !user._id) {
    console.warn(" Tidak ada user login, tidak menyimpan riwayat.");
    return;
  }

  const payload = {
    userId: user._id,
    penyakit: hasil.disease,
    confidence: hasil.confidence,
    rekomendasi: hasil.recommendations.map((item) => ({
      nama: item.brand,
      produk: item.name,
      harga: Number(item.price.replace(/[^\d]/g, "")),
    })),
  };

  console.log("📤 Payload yang dikirim:", payload);

  try {
    const res = await axios.post("https://asistant-kulit-production-7ab2.up.railway.app/api/riwayat", payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data.success) {
      console.log(" Riwayat berhasil disimpan");
    } else {
      console.warn(" Gagal simpan riwayat:", res.data.message);
    }
  } catch (err) {
    console.error(" Error simpan riwayat:", err.response?.data || err.message);
  }
};

export default simpanRiwayat;