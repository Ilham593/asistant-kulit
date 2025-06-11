import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiClock } from 'react-icons/fi';
import HistoryPresenter from '../presenters/history-presenter';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [history, setHistory] = useState(null);
  const presenter = new HistoryPresenter();

  useEffect(() => {
    if (token) {
      presenter.fetchHistory(token).then(setHistory);
    }
  }, [token]);

  // State loading sebelum fetch (sementara)
  if (token && history === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat riwayat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefaf6] py-8 px-4">
      <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 justify-center mt-4 mb-10">
          <FiClock size={28} />
          <h1 className="text-2xl font-bold">Riwayat Deteksi</h1>
        </div>

        {/* 1) Belum login */}
        {!token && (
          <div className="text-center space-y-6">
            <p className="text-lg">Anda harus login untuk mengakses halaman ini.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/beranda')}
                className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 border rounded hover:bg-gray-100"
              >
                Kembali ke Beranda
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-4 py-2 bg-accent text-white rounded hover:opacity-90"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-white rounded hover:opacity-90"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* 2) Login tapi kosong */}
        {token && history?.length === 0 && (
          <div className="text-center">
            <p className="text-lg">Belum ada riwayat yang tersimpan.</p>
          </div>
        )}

        {/* 3) Ada riwayat */}
        {token && history?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item.id} className="text-center">
                <Link to={`/riwayat/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.disease}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                  <p className="mt-2 font-medium">{item.disease}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
