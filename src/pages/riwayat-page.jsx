import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiClock } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RiwayatPage() {
  const user = useSelector((state) => state.auth.user);
  const [riwayatList, setRiwayatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: true,
    });

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
      <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4 py-12" data-aos="fade-up">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center space-y-6 border">
          <div className="flex flex-col items-center gap-2">
            <FiClock size={40} className="text-blue-500" />
            <h2 className="text-2xl font-extrabold text-gray-800">Riwayat Deteksi</h2>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            ⚠️ Anda belum login.<br />Silakan login untuk melihat riwayat deteksi Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <button
              onClick={() => window.location.href = '/beranda'}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Beranda
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </button>
            <button
              onClick={() => window.location.href = '/register'}
              className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4 animate-fade-in">
      <h1
        className="text-4xl font-extrabold text-center text-gray-800 mb-8"
        data-aos="fade-up"
      >
        Riwayat Deteksi Anda
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
              className="bg-white rounded-xl shadow hover:shadow-md transition p-6"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-sm text-gray-500 mb-2">
                🕒 <span className="font-medium">Tanggal:</span>{" "}
                {new Date(item.tanggal).toLocaleString("id-ID")}
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  🧬 {item.penyakit} <span>({(item.confidence * 100).toFixed(2)}%)</span>
                </h2>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-800">Rekomendasi Produk</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {item.rekomendasi.map((produk, idx) => (
                    <div
                      key={idx}
                      className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition space-y-1"
                    >
                      <p className="font-medium text-gray-800">{produk.nama}</p>
                      <p className="text-sm text-gray-600">{produk.produk}</p>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
