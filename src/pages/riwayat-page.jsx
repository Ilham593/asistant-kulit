import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiClock } from "react-icons/fi";

export default function RiwayatPage() {
  const user = useSelector((state) => state.auth.user);
  const [riwayatList, setRiwayatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      if (!user || !user.id) {
        console.warn("User belum login atau ID tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://asistant-kulit-production-7ab2.up.railway.app/api/riwayat/${user.id}`
        );
        const data = res.data;

        if (data.success) {
          setRiwayatList(data.data);
        } else {
          console.warn("Gagal mengambil riwayat:", data.message);
        }
      } catch (err) {
        console.error("Error fetch riwayat:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, [user]);

  if (!user || !user.id) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-yellow-50 to-amber-100 px-4 pt-28">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6 border">
          <div className="flex flex-col items-center gap-2">
            <FiClock size={36} className="text-amber-500" />
            <h2 className="text-xl font-bold text-gray-800">Riwayat Deteksi</h2>
          </div>
          <p className="text-gray-700 text-lg">
            ⚠️ Anda belum login.<br />Silakan login untuk melihat riwayat deteksi Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <button
              onClick={() => window.location.href = '/beranda'}
              className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 border rounded hover:bg-gray-100 transition"
            >
              Beranda
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full sm:w-auto px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => window.location.href = '/register'}
              className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📝 Riwayat Deteksi Anda
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">🔄 Memuat riwayat...</p>
      ) : riwayatList.length === 0 ? (
        <p className="text-center text-gray-500">📭 Belum ada riwayat deteksi.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {riwayatList.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-sm text-gray-500 mb-2">
                🕒 <span className="font-medium">Tanggal:</span>{" "}
                {new Date(item.tanggal).toLocaleString("id-ID")}
              </div>

              <div className="mb-3">
                <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
                  🧬 {item.penyakit} <span>({(item.confidence * 100).toFixed(2)}%)</span>
                </h2>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-800">🛒 Rekomendasi Produk</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.rekomendasi.map((produk, idx) => (
                    <div
                      key={idx}
                      className="p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition"
                    >
                      <p className="font-medium">{produk.nama}</p>
                      <p className="text-sm text-gray-700 mb-1">{produk.produk}</p>
                      <p className="text-green-600 font-semibold text-sm">
                        Rp{produk.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
