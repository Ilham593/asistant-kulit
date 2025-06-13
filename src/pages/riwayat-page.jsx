import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function RiwayatPage() {
  const user = useSelector((state) => state.auth.user);

  const [riwayatList, setRiwayatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      if (!user || !user.id) {
        console.warn(" User belum login atau ID tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`https://asistant-kulit-production-7ab2.up.railway.app/api/riwayat/${user.id}`);
        const data = res.data;

        if (data.success) {
          setRiwayatList(data.data);
        } else {
          console.warn("Gagal mengambil riwayat:", data.message);
        }
      } catch (err) {
        console.error(" Error fetch riwayat:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, [user]);

  if (!user || !user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-gray-600 text-lg">
          Anda belum login. Silakan login terlebih dahulu untuk melihat riwayat deteksi Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefaf6] py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Riwayat Deteksi Anda</h1>

      {loading ? (
        <p className="text-center text-gray-500">🔄 Memuat riwayat...</p>
      ) : riwayatList.length === 0 ? (
        <p className="text-center text-gray-500">📭 Belum ada riwayat deteksi.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {riwayatList.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow space-y-3">
              <p className="text-sm text-gray-500">
                🕒 Tanggal: {new Date(item.tanggal).toLocaleString("id-ID")}
              </p>
              <p className="font-semibold text-red-600">
                🧬 Penyakit: {item.penyakit} ({(item.confidence * 100).toFixed(2)}%)
              </p>

              <div>
                <h3 className="font-medium mb-2">🛒 Rekomendasi Produk:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {item.rekomendasi.map((produk, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{produk.nama}</span> — {produk.produk} (
                      Rp{produk.harga.toLocaleString("id-ID")})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
